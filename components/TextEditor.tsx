'use client';

import React, { useEffect, useRef, useState } from 'react';
import parse from 'html-react-parser';
import clsx from 'clsx';
import Link from 'next/link';
const text = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi, omnis amet.';

type TextEditor = {
  post: Post;
  // text: string;
  // boldText: SelectedText[];
};

export default function TextEditor({ post }: TextEditor) {
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
  const [boldText, setBoldText] = useState<SelectedText[]>(
    transformPostBody(post.body).tempBoldText,
  );
  // const [boldText, setBoldText] = useState<SelectedText[]>([
  //   // { text: 'ipsum', seIndexes: [6, 11] },
  //   // { text: 'amet consectetur', seIndexes: [23, 39] },
  // ]);
  const [bolded, setBolded] = useState(false);

  const [content, setContent] = useState(transformPostBody(post.body).text);
  const [updatedText, setUpdatedText] = useState(post.body);
  const [status, setStatus] = useState(false);
  const divRef = useRef(null);
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

  const selectText = () => {
    setBolded(false);
    const div = divRef.current;
    if (!div) return -1; // Проверка, что div существует

    const selection = window.getSelection() as Selection;
    if (selection.rangeCount === 0) return -1; // Проверка, что текст выделен
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

  // console.log({ content });
  // console.log({ updatedText });
  // console.log({ boldText });
  // console.log('++++++++++++++++++++++++++++++++++++++++++++++++++');
  // console.log({ selectedText });
  // console.log(parse(updatedText));

  const handleBlur = () => {
    const time = setTimeout(() => {
      setBolded(false);
      setSelectedText({ text: '', seIndexes: [0, 0] });
      // console.log('blur');
    }, 100);
    // clearTimeout(time);
  };

  const handleChange: React.FormEventHandler<HTMLDivElement> = async (e) => {
    const divEl = e.target as HTMLDivElement;

    const { text, tempBoldText } = transformPostBody(divEl.innerHTML);

    // const range = document.createRange();
    const sel = window.getSelection() as Selection;
    let range = sel?.getRangeAt(0) as Range;
    const offset = range.startOffset;
    const node = range.startContainer;

    await setContent(text);
    await setUpdatedText(divEl.innerHTML);
    await setBoldText(tempBoldText);

    // console.log(node);
    // console.log(offset);
    // console.log(findTextNode(node, offset));

    range = document.createRange();
    range.setStart(node, offset);
    range.setEnd(node, offset);

    // function findTextNode(node: Node, offset: number) {
    //   // Find the corresponding text node for an element node
    //   var walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null);
    //   var currentNode = walker.currentNode;

    //   while (walker.nextNode()) {
    //     if (offset <= currentNode.length) {
    //       return currentNode;
    //     }
    //     offset -= currentNode.length;
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

    sel.removeAllRanges();
    sel.addRange(range);
    // console.log('==============================');
  };
  
  // button B must wrap selected text in span with appropriately className not wrap with <b> or <u> or <i> etc
  // last unbolded text don't look like regular text
  // this component must take only a string, not the entire post object
  // this component must receive the updatedText state and its setState as props

  // then, in the main component, we should have the post.title and post.body texts, and the update/cancel buttons should also be in the main component.

  // remove text ERROR because we remove <>text <b>text</b> text</>

  return (
    <>
      <div className='flex flex-col w-full gap-2'>
        <div className='flex items-center gap-1 p-2 bg-white shadow-md rounded-xl'>
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
              'flex items-center justify-center w-8 h-8 italic text-gray-800  rounded-md hover:bg-gray-100',
            )}
          >
            C
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
          tabIndex={0}
          contentEditable
          onInput={handleChange}
          ref={divRef}
          onMouseUp={selectText}
          onBlur={handleBlur}
        >
          {parse(updatedText)}
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
