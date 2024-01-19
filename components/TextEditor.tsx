'use client';

import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type TextEditor = {
  text: string;
  updatedText: string;
  setUpdatedText: React.Dispatch<React.SetStateAction<string>>;
  // text: string;
  // boldText: SelectedText[];
};

export default function TextEditor({ text, updatedText, setUpdatedText }: TextEditor) {
  const transformPostBody = (input: string) => {
    // console.log(input);
    // console.log(content);

    const boldRegex = /<b>(.*?)<\/b>/g;
    let match;
    const tempBoldText: SelectedText[] = [];
    // console.log(boldRegex.exec(input));
    // console.log(boldRegex.exec(input));

    let i = 0;
    while ((match = boldRegex.exec(input)) !== null) {
      // console.log(match);
      const boldText = match[1];
      const startIndex = match.index - i * 7;
      const endIndex = startIndex + boldText.length;

      // console.log({ text: boldText, indexes: [startIndex, endIndex] });
      tempBoldText.push({ text: boldText, seIndexes: [startIndex, endIndex] });
      i++;
    }
    // [8, 12]
    // [35, 39]
    // console.log(boldTextIndexes);
    // setBoldText((p) => [...p, ...boldTextIndexes]);
    return { text: input.replace(/<\/?[^>]+(>|$)/g, ''), tempBoldText };
  }; // console.log(post);

  const [selectedText, setSelectedText] = useState<SelectedText>({ text: '', seIndexes: [0, 0] });
  const [boldText, setBoldText] = useState<SelectedText[]>(transformPostBody(text).tempBoldText);
  // const [boldText, setBoldText] = useState<SelectedText[]>([
  //   // { text: 'ipsum', seIndexes: [6, 11] },
  //   // { text: 'amet consectetur', seIndexes: [23, 39] },
  // ]);
  const [bolded, setBolded] = useState(false);

  const [content, setContent] = useState(transformPostBody(text).text);
  const [status, setStatus] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const caretPos = useRef(null) as any;
  // const textWithoutTags = updatedText.replace(/<\/?[^>]+(>|$)/g, '');

  const isOverlap = (a: [number, number], b: [number, number]) => {
    // return (a[0] > b[0] && a[0] < b[1]) || (b[0] > a[0] && b[0] < a[1]) ? true : false;
    return (a[0] > b[0] && a[0] < b[1]) ||
      (b[0] > a[0] && b[0] < a[1]) ||
      a[0] === b[0] ||
      a[1] === b[1]
      ? true
      : false;
  };

  const concatOverlappingText = (a: SelectedText, b: SelectedText): [number, number] => {
    const sortedConcatSeIndexes = a.seIndexes.concat(b.seIndexes).sort((a, b) => a - b);
    return [sortedConcatSeIndexes[0], sortedConcatSeIndexes[sortedConcatSeIndexes.length - 1]];
  };

  const isBolded = (selectedSeIndexes: [number, number]) =>
    boldText.find((el) => {
      const a = el.seIndexes;
      const b = [...selectedSeIndexes] as [number, number];
      return (b[0] > a[0] && b[0] < a[1] && b[1] > a[0] && b[1] < a[1]) ||
        (a[0] === b[0] && a[1] === b[1]) ||
        (b[0] === a[0] && b[0] < a[1] && b[1] > a[0] && b[1] < a[1]) ||
        (b[0] > a[0] && b[0] < a[1] && b[1] === a[1])
        ? true
        : false;
    });

  const boldTextSomeOverlap = () =>
    boldText.some((el) => isOverlap(el.seIndexes, selectedText.seIndexes));

  const splitBoldTextEl = () => {
    const boldT = isBolded(selectedText.seIndexes) as SelectedText;
    // console.log(boldT);
    // console.log(selectedText);
    const slice1: [number, number] = [boldT.seIndexes[0], selectedText.seIndexes[0]];
    const slice2: [number, number] = [selectedText.seIndexes[1], boldT.seIndexes[1]];
    const newEls = [
      { text: content.slice(...slice1), seIndexes: slice1 },
      { text: content.slice(...slice2), seIndexes: slice2 },
    ].filter((el) => el.text !== '');
    console.log([
      ...boldText.filter(
        (el) => el.seIndexes[0] !== boldT.seIndexes[0] && el.seIndexes[1] !== boldT.seIndexes[1],
      ),
      ...newEls,
    ]);
    setBoldText((p) => [
      ...p.filter(
        (el) => el.seIndexes[0] !== boldT.seIndexes[0] && el.seIndexes[1] !== boldT.seIndexes[1],
      ),
      ...newEls,
    ]);
    // setBoldText((p) => [...p.filter((el) => el.text !== boldT.text), ...newEls]);
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
    console.log(el);
    console.log(pos);

    // Loop through all child nodes
    for (const node of el.childNodes) {
      if (node.nodeType == 3) {
        // we have a text node
        if (node.length >= pos) {
          // finally add our range
          let range = document.createRange();
          let sel = window.getSelection() as Selection;
          range.setStart(node, pos);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
          return -1; // we are done
        } else {
          pos -= node.length;
        }
      } else {
        pos = setCaret(node, pos);
        if (pos == -1) {
          return -1; // no need to finish the for loop
        }
      }
    }
    return pos; // needed because of recursion stuff
  }

  const selectText = () => {
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

    // console.log({ text: selection.toString() }, selStart, selEnd);
    setSelectedText({ text: selection.toString(), seIndexes: [selStart, selEnd] });

    if (boldText.length > 0) {
      // console.log(isBolded([selStart, selEnd]));

      if (isBolded([selStart, selEnd])) {
        setBolded(true);
      }
    }
  };
  // const selectTextWithKeyBoard: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
  //   // if((e.shiftKey && e.key === 'ArrowLeft') || (e.shiftKey && e.key === 'ArrowRight'))
  //   console.log((e.shiftKey && e.key === 'ArrowLeft') || (e.shiftKey && e.key === 'ArrowRight'));

  //   // if (e.shiftKey && e.key === 'ArrowLeft') return -1;
  //   // if (e.shiftKey && e.key === 'ArrowRight') return -1;
  //   setBolded(false);
  //   const div = divRef.current;
  //   if (!div) return -1;

  //   const selection = window.getSelection() as Selection;
  //   if (selection.rangeCount === 0) return -1;
  //   if (selection.toString() === '') return -1;
  //   console.log(selection.toString());

  //   const range = selection.getRangeAt(0);
  //   const preSelectionRange = range.cloneRange();
  //   preSelectionRange.selectNodeContents(div);
  //   preSelectionRange.setEnd(range.startContainer, range.startOffset);

  //   const selStart = preSelectionRange.toString().length;
  //   const selEnd = selStart + selection.toString().length;

  //   // console.log({ text: selection.toString() }, selStart, selEnd);
  //   setSelectedText({ text: selection.toString(), seIndexes: [selStart, selEnd] });

  //   if (boldText.length > 0) {
  //     // console.log(isBolded([selStart, selEnd]));

  //     if (isBolded([selStart, selEnd])) {
  //       setBolded(true);
  //     }
  //   }
  // };

  const overlapCheck = () => {
    // console.log({ overlapCheckBoldText: boldText });
    let arr = boldText;

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (i !== j) {
          if (isOverlap(arr[i].seIndexes, arr[j].seIndexes)) {
            const concatTextSlice = concatOverlappingText(arr[i], arr[j]);
            const concatText = content.slice(...concatTextSlice);

            // console.log(arr[i].text);
            // console.log(arr[j].text);
            // console.log({ concatTextSlice }, { concatText });
            // console.log({ arr1: arr });

            arr = [
              ...arr.filter((el) => el.text !== arr[i].text && el.text !== arr[j].text),
              { text: concatText, seIndexes: concatTextSlice },
            ];
            // console.log({ arr2: arr });
          }
        }
      }
    }
    setBoldText(arr);
    setStatus(false);
  };

  const createBoldText = () => {
    if (selectedText.text !== '') {
      if (boldText.length === 0) {
        setBoldText((p) => [...p, selectedText]);
        setSelectedText({ text: '', seIndexes: [0, 0] });
        // replaceWithBoldText();
      } else {
        if (boldTextSomeOverlap()) {
          // console.log('Enter');
          // console.log(status);

          if (isBolded(selectedText.seIndexes)) {
            console.log('unbold');
            splitBoldTextEl();
          } else {
            console.log('bold');
            for (let i = 0; i < boldText.length; i++) {
              // console.log({ selectedText });
              // console.log(boldText[i]);
              if (isOverlap(boldText[i].seIndexes, selectedText.seIndexes)) {
                // console.log('isOverlap');
                const concatTextSlice = concatOverlappingText(boldText[i], selectedText);
                const concatText = content.slice(...concatTextSlice);
                // console.log({ text: concatText, seIndexes: concatTextSlice });
                // setBoldText((p) => [
                //   ...p.filter((b) => b.text !== boldText[i].text),
                //   { text: concatText, seIndexes: concatTextSlice },
                // ]);
                setBoldText((p) => [
                  ...p.filter(
                    (b) =>
                      b.seIndexes[0] !== boldText[i].seIndexes[0] &&
                      b.seIndexes[1] !== boldText[i].seIndexes[1],
                  ),
                  { text: concatText, seIndexes: concatTextSlice },
                ]);
                setSelectedText({ text: '', seIndexes: [0, 0] });

                // replaceWordWithBold(updatedText, concatTextSlice[0], concatTextSlice[1]);
              }
            }
          }
          setStatus(true);
        } else {
          setBoldText((p) => [...p, selectedText]);
          setSelectedText({ text: '', seIndexes: [0, 0] });
        }
      }
    }
  };

  useEffect(() => {
    // if (boldText.length > 0) {
    // console.log({ content });
    // console.log({ boldText });
    replaceWithBoldText(content, boldText);
    // }
  }, [boldText]);

  useEffect(() => {
    // console.log({ status });
    if (status) {
      // console.log({ updatedBoldText: boldText });
      overlapCheck();
    }
  }, [status]);

  useEffect(() => {
    if (caretPos.current !== null && divRef.current !== null) {
      setCaret(divRef.current, caretPos.current);
      divRef.current.focus();
    }
  }, [content]);

  // useEffect(() => {
  //   if (divRef.current) {
  //     divRef.current.focus();
  //   }
  // }, [updatedText]);

  const replaceWithBoldText = (text: string, boldText: SelectedText[]) => {
    let newText = text;

    const sortedBoldText = [...boldText].sort((a, b) => a.seIndexes[0] - b.seIndexes[0]);
    // const sortedBoldText = [...boldText];
    // console.log({ unsortedBoldText: boldText });
    // console.log({ sortedBoldText });

    for (let i = 0; i < sortedBoldText.length; i++) {
      if (i === 0) {
        newText =
          newText.slice(0, sortedBoldText[i].seIndexes[0]) +
          `<b>${sortedBoldText[i].text}</b>` +
          newText.slice(sortedBoldText[i].seIndexes[1]);
      } else if (i > 0) {
        newText =
          newText.slice(0, sortedBoldText[i].seIndexes[0] + i * 7) +
          `<b>${sortedBoldText[i].text}</b>` +
          newText.slice(sortedBoldText[i].seIndexes[1] + i * 7);
      }
      // console.log({ newText });
    }
    setUpdatedText(newText);
  };

  // console.log({ selectedText });

  // console.log({ updatedText });
  // console.log({ content });
  // console.log({ boldText });
  // console.log('++++++++++++++++++++++++++++++++++++++++++++++++++');
  // console.log(parse(updatedText));

  const handleBlur = () => {
    const time = setTimeout(() => {
      setBolded(false);
      setSelectedText({ text: '', seIndexes: [0, 0] });
      // console.log('blur');
    }, 100);
    // clearTimeout(time);
  };

  // [8, 12]
  // [35, 39]

  const handleChange: React.FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    const divEl = e.target as HTMLDivElement;

    const { text, tempBoldText } = transformPostBody(divEl.innerHTML);

    caretPos.current = getCaret(divEl);

    await Promise.all([
      setContent(text),
      setUpdatedText(divEl.innerHTML),
      setBoldText(tempBoldText),
    ]);
  };

  // console.log(findTextNode(node, offset));
  // function findTextNode(node: Node, offset: number) {
  //   // Find the corresponding text node for an element node
  //   var walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null);
  //   var currentNode = walker.currentNode;

  //   while (walker.nextNode()) {
  //     if (offset <= currentNode.length) {
  //       return currentNode;
  //     }
  //     offset -= currentNode.length;n    // offset -= currentNode.length;

  //     currentNode = walker.currentNode;
  //   }

  //   return currentNode;
  // }
  // if (node.nodeType === 3) {
  //   // If the node is a text node, set the range within the updated text
  // range.setStart(node, offset);
  // range.setEnd(node, offset);
  // } else {
  //   // If the node is an element node, find the corresponding text node
  //   var textNode = findTextNode(node, offset);
  //   range.setStart(textNode, offset);
  //   range.setEnd(textNode, offset);
  // }

  // console.log('==============================');

  console.log('updated');

  return (
    <>
      <div className='flex flex-col w-full gap-2'>
        <div className='flex items-center gap-1 px-3 bg-white shadow-md rounded-xl'>
          <button
            className={clsx(
              'flex items-center justify-center w-8 h-8 font-bold text-gray-800  rounded-md hover:bg-gray-100',
              {
                'bg-gray-200 hover:bg-gray-200': bolded,
              },
            )}
            onClick={createBoldText}
          >
            B
          </button>
          <button
            className={clsx(
              'flex items-center justify-center w-8 h-8 italic text-gray-800 rounded-md hover:bg-gray-100',
            )}
          >
            I
          </button>
          <button
            className={clsx(
              'flex items-center justify-center w-8 h-8 underline text-gray-800  rounded-md hover:bg-gray-100',
            )}
          >
            U
          </button>
        </div>
        <div
          className='w-full min-h-[300px] max-h-[600px] p-5 bg-white rounded-xl overflow-y-scroll text-black'
          // tabIndex={0}
          contentEditable
          onInput={handleChange}
          ref={divRef}
          onMouseUp={selectText}
          key='div'
          // onKeyDown={selectTextWithKeyBoard}
          onBlur={handleBlur}
          dangerouslySetInnerHTML={{ __html: updatedText }}
        >
          {/* {parse(updatedText)} */}
        </div>

        {/* <div>
          {boldText.map((el, i) => (
            <div key={i}>{el.text}</div>
          ))}
        </div> */}
      </div>
    </>
  );
}
