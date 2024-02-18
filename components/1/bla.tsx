'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type TextEditor = {
  text: string;
  updatedText: string;
  setUpdatedText: React.Dispatch<React.SetStateAction<string>>;
};

type SpecText = 'bold' | 'italic' | 'underlined';

export default function TextEditor({ text, updatedText, setUpdatedText }: TextEditor) {
  const getCleanText = (text: string): string => {
    return text.replace(/<\/?[^>]+(>|$)/g, '');
  };

  const decompositionOfBoldText = (input: string) => {
    const boldRegex = /<b>(.*?)<\/b>/g;
    let match;
    const cleanInput = input.replace(/<i>|<\/i>/g, '').replace(/<u>|<\/u>/g, '');
    const tempBoldText: SelectedText[] = [];

    let i = 0;
    while ((match = boldRegex.exec(cleanInput)) !== null) {
      const boldText = match[1];
      const startIndex = match.index - i * 7;
      const endIndex = startIndex + boldText.length;

      tempBoldText.push({ text: boldText, seIndexes: [startIndex, endIndex] });
      i++;
    }
    return tempBoldText;
  };

  const decompositionOfItalicText = (input: string) => {
    const italicRegex = /<i>(.*?)<\/i>/g;
    let match;
    const cleanInput = input.replace(/<b>|<\/b>/g, '').replace(/<u>|<\/u>/g, '');
    const tempItalicText: SelectedText[] = [];

    let i = 0;
    while ((match = italicRegex.exec(cleanInput)) !== null) {
      const italicText = match[1];
      const startIndex = match.index - i * 7;
      const endIndex = startIndex + italicText.length;

      tempItalicText.push({
        text: italicText.replace(/<\/?[^>]+(>|$)/g, ''),
        seIndexes: [startIndex, endIndex],
      });
      i++;
    }
    return tempItalicText;
  };

  const decompositionOfUnderlinedText = (input: string) => {
    const underlineRegex = /<u>(.*?)<\/u>/g;
    let match;
    const cleanInput = input.replace(/<b>|<\/b>/g, '').replace(/<i>|<\/i>/g, '');
    const tempUnderlinedText: SelectedText[] = [];

    let i = 0;
    while ((match = underlineRegex.exec(cleanInput)) !== null) {
      const italicText = match[1];
      const startIndex = match.index - i * 7;
      const endIndex = startIndex + italicText.length;

      tempUnderlinedText.push({
        text: italicText.replace(/<\/?[^>]+(>|$)/g, ''),
        seIndexes: [startIndex, endIndex],
      });
      i++;
    }
    return tempUnderlinedText;
  };

  const [selectedText, setSelectedText] = useState<SelectedText>({ text: '', seIndexes: [0, 0] });
  const [boldText, setBoldText] = useState<SelectedText[]>(decompositionOfBoldText(text));
  const [italicText, setItalicText] = useState<SelectedText[]>(decompositionOfItalicText(text));
  const [underlinedText, setUnderlinedText] = useState<SelectedText[]>(
    decompositionOfUnderlinedText(text),
  );

  const [bolded, setBolded] = useState(false);
  const [currentTag, setCurrentTag] = useState<SpecText | ''>('');

  const [content, setContent] = useState(getCleanText(text));
  const [status, setStatus] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const caretPos = useRef(null) as any;

  const specTexts = {
    bold: boldText,
    italic: italicText,
    underlined: underlinedText,
  };
  const setSpecTexts = {
    bold: setBoldText,
    italic: setItalicText,
    underlined: setUnderlinedText,
  };

  const isOverlap = (a: [number, number], b: [number, number]) => {
    return (a[0] >= b[0] && a[0] <= b[1]) ||
      (b[0] >= a[0] && b[0] <= a[1]) ||
      a[0] === b[0] ||
      a[1] === b[1]
      ? true
      : false;
  };

  const concatOverlappingText = (a: SelectedText, b: SelectedText): [number, number] => {
    const sortedConcatSeIndexes = a.seIndexes.concat(b.seIndexes).sort((a, b) => a - b);
    return [sortedConcatSeIndexes[0], sortedConcatSeIndexes[sortedConcatSeIndexes.length - 1]];
  };

  const isSpecText = (selectedSeIndexes: [number, number], specText: SpecText) =>
    specTexts[specText].find((el) => {
      const a = el.seIndexes;
      const b = [...selectedSeIndexes] as [number, number];
      return (b[0] > a[0] && b[0] < a[1] && b[1] > a[0] && b[1] < a[1]) ||
        (a[0] === b[0] && a[1] === b[1]) ||
        (b[0] === a[0] && b[0] < a[1] && b[1] > a[0] && b[1] < a[1]) ||
        (b[0] > a[0] && b[0] < a[1] && b[1] === a[1])
        ? true
        : false;
    });

  const specialTextSomeOverlap = (specText: SpecText) =>
    specTexts[specText].some((el) => isOverlap(el.seIndexes, selectedText.seIndexes));

  const splitSpecTextEl = (specText: SpecText) => {
    const specT = isSpecText(selectedText.seIndexes, specText) as SelectedText;
    const slice1: [number, number] = [specT.seIndexes[0], selectedText.seIndexes[0]];
    const slice2: [number, number] = [selectedText.seIndexes[1], specT.seIndexes[1]];
    const newEls = [
      { text: content.slice(...slice1), seIndexes: slice1 },
      { text: content.slice(...slice2), seIndexes: slice2 },
    ].filter((el) => el.text !== '');

    setBoldText((p) => [
      ...p.filter(
        (el) => el.seIndexes[0] !== specT.seIndexes[0] && el.seIndexes[1] !== specT.seIndexes[1],
      ),
      ...newEls,
    ]);
  };

  function getCaret(el: Node) {
    let caretAt = 0;
    const sel = window.getSelection() as Selection;

    if (sel.rangeCount == 0) {
      return caretAt;
    }

    const range = sel.getRangeAt(0);
    const preRange = range.cloneRange();

    preRange.selectNodeContents(el);
    preRange.setEnd(range.endContainer, range.endOffset);
    caretAt = preRange.toString().length;

    return caretAt;
  }

  function setCaret(el: any, pos: number) {
    for (const node of el.childNodes) {
      if (node.nodeType == 3) {
        if (node.length >= pos) {
          let range = document.createRange();
          let sel = window.getSelection() as Selection;
          range.setStart(node, pos);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
          return -1;
        } else {
          pos -= node.length;
        }
      } else {
        pos = setCaret(node, pos);
        if (pos == -1) {
          return -1;
        }
      }
    }
    return pos;
  }

  const selectText = useCallback(() => {
    setBolded(false);
    const div = divRef.current;
    if (!div) return -1;

    const selection = window.getSelection() as Selection;
    if (selection.rangeCount === 0) return -1;
    if (selection.toString() === '') return -1;

    const range = selection.getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(div);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);

    const selStart = preSelectionRange.toString().length;
    const selEnd = selStart + selection.toString().length;

    setSelectedText({ text: selection.toString(), seIndexes: [selStart, selEnd] });

    if (boldText.length > 0) {
      // if (isBolded([selStart, selEnd])) {
      //   setBolded(true);
      // }
    }
  }, [divRef]);

  const overlapCheck = (specText: SpecText) => {
    let arr = specTexts[specText];
    const setFunc = setSpecTexts[specText];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (i !== j) {
          if (isOverlap(arr[i].seIndexes, arr[j].seIndexes)) {
            const concatTextSlice = concatOverlappingText(arr[i], arr[j]);
            const concatText = content.slice(...concatTextSlice);

            arr = [
              ...arr.filter(
                (el) =>
                  el.seIndexes[0] !== arr[i].seIndexes[0] &&
                  el.seIndexes[1] !== arr[i].seIndexes[1] &&
                  el.seIndexes[0] !== arr[j].seIndexes[0] &&
                  el.seIndexes[1] !== arr[j].seIndexes[1],
              ),
              { text: concatText, seIndexes: concatTextSlice },
            ];
            // console.log({ arr2: arr });
          }
        }
      }
    }
    setFunc(arr);
    setStatus(false);
  };

  const createSpecText = (specText: SpecText) => {
    const value = specTexts[specText];
    const setFunc = setSpecTexts[specText];
    setCurrentTag(specText);

    if (selectedText.text !== '') {
      if (value.length === 0) {
        setFunc([selectedText]);
        setSelectedText({ text: '', seIndexes: [0, 0] });
      } else {
        if (specialTextSomeOverlap(specText)) {
          if (isSpecText(selectedText.seIndexes, specText)) {
            splitSpecTextEl(specText);
          } else {
            for (let i = 0; i < value.length; i++) {
              if (isOverlap(value[i].seIndexes, selectedText.seIndexes)) {
                const concatTextSlice = concatOverlappingText(value[i], selectedText);
                const concatText = content.slice(...concatTextSlice);
                setFunc((p) => [
                  ...p.filter(
                    (b) =>
                      b.seIndexes[0] !== value[i].seIndexes[0] &&
                      b.seIndexes[1] !== value[i].seIndexes[1],
                  ),
                  { text: concatText, seIndexes: concatTextSlice },
                ]);
                setSelectedText({ text: '', seIndexes: [0, 0] });
              }
            }
          }
          setStatus(true);
        } else {
          setFunc((p) => [...p, selectedText]);
          setSelectedText({ text: '', seIndexes: [0, 0] });
        }
      }
    }
  };

  useEffect(() => {
    if (currentTag !== '') {
      console.log('replace');
      replaceWithSpecText(content);
    }
    // }
  }, [boldText, italicText, underlinedText]);

  useEffect(() => {
    if (status) {
      if (currentTag !== '') {
        console.log('overlap');
        overlapCheck(currentTag);
      }
    }
  }, [status]);

  useEffect(() => {
    if (caretPos.current !== null && divRef.current !== null) {
      setCaret(divRef.current, caretPos.current);
      divRef.current.focus();
    }
  }, [content]);

  const replaceWithSpecText = (text: string) => {
    const newBoldText = boldText.map((boldT) => ({
      ...boldT,
      text: `<b>${boldT.text}</b>`,
      tag: 'b',
    }));
    const newItalicText = italicText.map((italicT) => ({
      ...italicT,
      text: `<i>${italicT.text}</i>`,
      tag: 'i',
    }));
    const newUnderlinedText = underlinedText.map((underlinedT) => ({
      ...underlinedT,
      text: `<u>${underlinedT.text}</u>`,
      tag: 'u',
    }));

    const commonTags = [...newBoldText, ...newItalicText, ...newUnderlinedText].sort(
      (a, b) => a.seIndexes[0] - b.seIndexes[0],
    );

    let arr = commonTags;

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (i !== j) {
          if (isOverlap(arr[i].seIndexes, arr[j].seIndexes)) {
            if (arr[i].tag === arr[j].tag) {
              const concatTextSlice = concatOverlappingText(arr[i], arr[j]);
              const concatText = `<${arr[i].tag}>${content.slice(...concatTextSlice)}</${
                arr[i].tag
              }>`;

              arr = [
                ...arr
                  .filter(
                    (el) =>
                      !(
                        el.seIndexes[0] === arr[i].seIndexes[0] &&
                        el.seIndexes[1] === arr[i].seIndexes[1] &&
                        el.text === arr[i].text
                      ),
                  )
                  .filter(
                    (el) =>
                      !(
                        el.seIndexes[0] === arr[j].seIndexes[0] &&
                        el.seIndexes[1] === arr[j].seIndexes[1] &&
                        el.text === arr[j].text
                      ),
                  ),

                { text: concatText, seIndexes: concatTextSlice, tag: arr[i].tag },
              ];
            }
          }
        }
      }
    }

    arr.sort((a, b) => a.seIndexes[0] - b.seIndexes[0]);

    let result = '';
    for (let i = 0; i < text.length; i++) {
      if (arr.some((el) => el.seIndexes[0] === i)) {
        const curEl = arr.find((el) => el.seIndexes[0] === i);
        // console.log(text[i]);
        // console.log(curEl);
        result += `<${curEl?.tag}>${text[i]}`;
      } else if (arr.some((el) => el.seIndexes[1] - 1 === i)) {
        const curEl = arr.find((el) => el.seIndexes[1] - 1 === i);
        result += `${text[i]}</${curEl?.tag}>`;
      } else {
        result += text[i];
      }
    }
    setUpdatedText(result);

    // console.log(result);
    // console.log(updatedText);
  };

  const handleBlur = useCallback(() => {
    const timeoutId = setTimeout(() => {
      setBolded(false);
      setSelectedText({ text: '', seIndexes: [0, 0] });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleChange: React.FormEventHandler<HTMLDivElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const divEl = e.target as HTMLDivElement;

      const text = getCleanText(divEl.innerHTML);
      const tempBoldText = decompositionOfBoldText(divEl.innerHTML);
      const tempItalicText = decompositionOfItalicText(divEl.innerHTML);
      const tempUnderlinedText = decompositionOfUnderlinedText(divEl.innerHTML);

      caretPos.current = getCaret(divEl);

      await Promise.all([
        setContent(text),
        setUpdatedText(divEl.innerHTML),
        setBoldText(tempBoldText),
        setItalicText(tempItalicText),
        setUnderlinedText(tempUnderlinedText),
      ]);
    },
    [divRef],
  );

  return (
    <div>
      <div className='flex flex-col w-full gap-2'>
        <div className='flex items-center gap-1 px-3 bg-white shadow-md rounded-xl'>
          <button
            type='button'
            className={clsx(
              'flex items-center justify-center w-8 h-8 font-bold text-gray-800  rounded-md hover:bg-gray-100',
              {
                'bg-gray-200 hover:bg-gray-200': bolded,
              },
            )}
            onClick={() => createSpecText('bold')}
          >
            B
          </button>
          <button
            type='button'
            className={clsx(
              'flex items-center justify-center w-8 h-8 italic text-gray-800 rounded-md hover:bg-gray-100',
            )}
            onClick={() => createSpecText('italic')}
          >
            I
          </button>
          <button
            type='button'
            className={clsx(
              'flex items-center justify-center w-8 h-8 underline text-gray-800  rounded-md hover:bg-gray-100',
            )}
            onClick={() => createSpecText('underlined')}
          >
            U
          </button>
        </div>
        <TextField
          divRef={divRef}
          selectText={selectText}
          updatedText={updatedText}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      </div>
    </div>
  );
}

type TextFieldProps = {
  handleChange: React.FormEventHandler<HTMLDivElement>;
  divRef: React.RefObject<HTMLDivElement>;
  selectText: () => void;
  handleBlur: () => void;
  updatedText: string;
};

const TextField = React.memo(
  ({ divRef, selectText, updatedText, handleChange, handleBlur }: TextFieldProps) => {
    return (
      <div className='relative'>
        {updatedText.length === 0 ? (
          <div className='absolute p-5 text-[#9ca3af] text-xl'>Enter some text ...</div>
        ) : null}
        <div
          className='w-full min-h-[300px] max-h-[600px] p-5 bg-white rounded-xl overflow-y-scroll text-black'
          contentEditable
          onInput={handleChange}
          ref={divRef}
          onMouseUp={selectText}
          key='div'
          onBlur={handleBlur}
          dangerouslySetInnerHTML={{ __html: updatedText }}
        />
      </div>
    );
  },
);
