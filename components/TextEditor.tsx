// 'use client';

// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import clsx from 'clsx';

// type TextEditor = {
//   text: string;
//   updatedText: string;
//   setUpdatedText: React.Dispatch<React.SetStateAction<string>>;
// };

// export default function TextEditor({ text, updatedText, setUpdatedText }: TextEditor) {
//   // console.log(/<b>(.*?)<\/b>/g.exec(updatedText));

//   const transformPostBody = (input: string) => {
//     // console.log(input);
//     // console.log(content);

//     const boldRegex = /<b>(.*?)<\/b>/g;
//     let match;
//     const tempBoldText: SelectedText[] = [];
//     // console.log(boldRegex.exec(input));
//     // console.log(boldRegex.exec(input));

//     let i = 0;
//     while ((match = boldRegex.exec(input)) !== null) {
//       // console.log(match);
//       const boldText = match[1];
//       const startIndex = match.index - i * 7;
//       const endIndex = startIndex + boldText.length;

//       // console.log({ text: boldText, indexes: [startIndex, endIndex] });
//       tempBoldText.push({ text: boldText, seIndexes: [startIndex, endIndex] });
//       i++;
//     }
//     // [8, 12]
//     // [35, 39]
//     return { text: input.replace(/<\/?[^>]+(>|$)/g, ''), tempBoldText };
//   };
//   const decompositionOfItalicText = (input: string) => {
//     const italicRegex = /<i>(.*?)<\/i>/g;
//     let match;
//     const cleanInput = input.replace(/<b>|<\/b>/g, '').replace(/<u>|<\/u>/g, '')
//     const tempItalicText: SelectedText[] = [];

//     let i = 0;
//     while ((match = italicRegex.exec(cleanInput)) !== null) {
//       // console.log(match);
//       const italicText = match[1];
//       const startIndex = match.index - i * 7;
//       const endIndex = startIndex + italicText.length;

//       tempItalicText.push({ text: italicText.replace(/<\/?[^>]+(>|$)/g, ''), seIndexes: [startIndex, endIndex] });
//       i++;
//     }
//     return { text: input.replace(/<\/?[^>]+(>|$)/g, ''), tempItalicText };
//   };
//   console.log(decompositionOfItalicText('<u>Lorem</u> <b>ips<i>um</b> sit amet</i> consectetur <i>bla</i>'));

//   // console.log(post);

//   const [selectedText, setSelectedText] = useState<SelectedText>({ text: '', seIndexes: [0, 0] });
//   const [boldText, setBoldText] = useState<SelectedText[]>(transformPostBody(text).tempBoldText);
//   const [cursiveText, setCursiveText] = useState<SelectedText>();
//   const [bolded, setBolded] = useState(false);

//   const [content, setContent] = useState(transformPostBody(text).text);
//   const [status, setStatus] = useState(false);
//   const divRef = useRef<HTMLDivElement>(null);
//   const caretPos = useRef(null) as any;

//   const isOverlap = (a: [number, number], b: [number, number]) => {
//     // return (a[0] > b[0] && a[0] < b[1]) || (b[0] > a[0] && b[0] < a[1]) ? true : false;
//     return (a[0] > b[0] && a[0] < b[1]) ||
//       (b[0] > a[0] && b[0] < a[1]) ||
//       a[0] === b[0] ||
//       a[1] === b[1]
//       ? true
//       : false;
//   };

//   const concatOverlappingText = (a: SelectedText, b: SelectedText): [number, number] => {
//     const sortedConcatSeIndexes = a.seIndexes.concat(b.seIndexes).sort((a, b) => a - b);
//     return [sortedConcatSeIndexes[0], sortedConcatSeIndexes[sortedConcatSeIndexes.length - 1]];
//   };

//   const isBolded = (selectedSeIndexes: [number, number]) =>
//     boldText.find((el) => {
//       const a = el.seIndexes;
//       const b = [...selectedSeIndexes] as [number, number];
//       return (b[0] > a[0] && b[0] < a[1] && b[1] > a[0] && b[1] < a[1]) ||
//         (a[0] === b[0] && a[1] === b[1]) ||
//         (b[0] === a[0] && b[0] < a[1] && b[1] > a[0] && b[1] < a[1]) ||
//         (b[0] > a[0] && b[0] < a[1] && b[1] === a[1])
//         ? true
//         : false;
//     });

//   const boldTextSomeOverlap = () =>
//     boldText.some((el) => isOverlap(el.seIndexes, selectedText.seIndexes));

//   const splitBoldTextEl = () => {
//     const boldT = isBolded(selectedText.seIndexes) as SelectedText;
//     // console.log(boldT);
//     // console.log(selectedText);
//     const slice1: [number, number] = [boldT.seIndexes[0], selectedText.seIndexes[0]];
//     const slice2: [number, number] = [selectedText.seIndexes[1], boldT.seIndexes[1]];
//     const newEls = [
//       { text: content.slice(...slice1), seIndexes: slice1 },
//       { text: content.slice(...slice2), seIndexes: slice2 },
//     ].filter((el) => el.text !== '');
//     // console.log([
//     //   ...boldText.filter(
//     //     (el) => el.seIndexes[0] !== boldT.seIndexes[0] && el.seIndexes[1] !== boldT.seIndexes[1],
//     //   ),
//     //   ...newEls,
//     // ]);
//     setBoldText((p) => [
//       ...p.filter(
//         (el) => el.seIndexes[0] !== boldT.seIndexes[0] && el.seIndexes[1] !== boldT.seIndexes[1],
//       ),
//       ...newEls,
//     ]);
//     // setBoldText((p) => [...p.filter((el) => el.text !== boldT.text), ...newEls]);
//   };

//   function getCaret(el: Node) {
//     let caretAt = 0;
//     const sel = window.getSelection() as Selection;

//     if (sel.rangeCount == 0) {
//       return caretAt;
//     }

//     const range = sel.getRangeAt(0);
//     const preRange = range.cloneRange();

//     preRange.selectNodeContents(el);
//     preRange.setEnd(range.endContainer, range.endOffset);
//     caretAt = preRange.toString().length;

//     return caretAt;
//   }

//   function setCaret(el: any, pos: number) {
//     // console.log(el);
//     // console.log(pos);

//     // Loop through all child nodes
//     for (const node of el.childNodes) {
//       if (node.nodeType == 3) {
//         // we have a text node
//         if (node.length >= pos) {
//           // finally add our range
//           let range = document.createRange();
//           let sel = window.getSelection() as Selection;
//           range.setStart(node, pos);
//           range.collapse(true);
//           sel.removeAllRanges();
//           sel.addRange(range);
//           return -1; // we are done
//         } else {
//           pos -= node.length;
//         }
//       } else {
//         pos = setCaret(node, pos);
//         if (pos == -1) {
//           return -1; // no need to finish the for loop
//         }
//       }
//     }
//     return pos; // needed because of recursion stuff
//   }

//   const selectText = useCallback(() => {
//     setBolded(false);
//     const div = divRef.current;
//     if (!div) return -1;

//     const selection = window.getSelection() as Selection;
//     if (selection.rangeCount === 0) return -1;
//     if (selection.toString() === '') return -1;

//     const range = selection.getRangeAt(0);
//     const preSelectionRange = range.cloneRange();
//     preSelectionRange.selectNodeContents(div);
//     preSelectionRange.setEnd(range.startContainer, range.startOffset);

//     const selStart = preSelectionRange.toString().length;
//     const selEnd = selStart + selection.toString().length;

//     // const selText = selection.toString().replace('&nbsp;', '')
//     // console.log({ text: selection.toString() }, selStart, selEnd);
//     setSelectedText({ text: selection.toString(), seIndexes: [selStart, selEnd] });

//     if (boldText.length > 0) {
//       // console.log(isBolded([selStart, selEnd]));

//       if (isBolded([selStart, selEnd])) {
//         setBolded(true);
//       }
//     }
//   }, [divRef]);
//   // const selectTextWithKeyBoard: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
//   //   // if((e.shiftKey && e.key === 'ArrowLeft') || (e.shiftKey && e.key === 'ArrowRight'))
//   //   console.log((e.shiftKey && e.key === 'ArrowLeft') || (e.shiftKey && e.key === 'ArrowRight'));

//   //   // if (e.shiftKey && e.key === 'ArrowLeft') return -1;
//   //   // if (e.shiftKey && e.key === 'ArrowRight') return -1;
//   //   setBolded(false);
//   //   const div = divRef.current;
//   //   if (!div) return -1;

//   //   const selection = window.getSelection() as Selection;
//   //   if (selection.rangeCount === 0) return -1;
//   //   if (selection.toString() === '') return -1;
//   //   console.log(selection.toString());

//   //   const range = selection.getRangeAt(0);
//   //   const preSelectionRange = range.cloneRange();
//   //   preSelectionRange.selectNodeContents(div);
//   //   preSelectionRange.setEnd(range.startContainer, range.startOffset);

//   //   const selStart = preSelectionRange.toString().length;
//   //   const selEnd = selStart + selection.toString().length;

//   //   // console.log({ text: selection.toString() }, selStart, selEnd);
//   //   setSelectedText({ text: selection.toString(), seIndexes: [selStart, selEnd] });

//   //   if (boldText.length > 0) {
//   //     // console.log(isBolded([selStart, selEnd]));

//   //     if (isBolded([selStart, selEnd])) {
//   //       setBolded(true);
//   //     }
//   //   }
//   // };

//   const overlapCheck = () => {
//     // console.log({ overlapCheckBoldText: boldText });
//     let arr = boldText;

//     for (let i = 0; i < arr.length; i++) {
//       for (let j = 0; j < arr.length; j++) {
//         if (i !== j) {
//           if (isOverlap(arr[i].seIndexes, arr[j].seIndexes)) {
//             const concatTextSlice = concatOverlappingText(arr[i], arr[j]);
//             const concatText = content.slice(...concatTextSlice);

//             // console.log(arr[i].text);
//             // console.log(arr[j].text);
//             // console.log({ concatTextSlice }, { concatText });
//             // console.log({ arr1: arr });

//             arr = [
//               ...arr.filter(
//                 (el) =>
//                   el.seIndexes[0] !== arr[i].seIndexes[0] &&
//                   el.seIndexes[1] !== arr[i].seIndexes[1] &&
//                   el.seIndexes[0] !== arr[j].seIndexes[0] &&
//                   el.seIndexes[1] !== arr[j].seIndexes[1],
//               ),
//               { text: concatText, seIndexes: concatTextSlice },
//             ];
//             // console.log({ arr2: arr });
//           }
//         }
//       }
//     }
//     setBoldText(arr);
//     setStatus(false);
//   };

//   const createBoldText = () => {
//     if (selectedText.text !== '') {
//       if (boldText.length === 0) {
//         setBoldText([selectedText]);
//         setSelectedText({ text: '', seIndexes: [0, 0] });
//         // replaceWithBoldText();
//       } else {
//         if (boldTextSomeOverlap()) {
//           // console.log('Enter');
//           // console.log(status);

//           if (isBolded(selectedText.seIndexes)) {
//             // console.log('unbold');
//             splitBoldTextEl();
//           } else {
//             // console.log('bold');
//             for (let i = 0; i < boldText.length; i++) {
//               // console.log({ selectedText });
//               // console.log(boldText[i]);
//               if (isOverlap(boldText[i].seIndexes, selectedText.seIndexes)) {
//                 // console.log('isOverlap');
//                 const concatTextSlice = concatOverlappingText(boldText[i], selectedText);
//                 const concatText = content.slice(...concatTextSlice);
//                 // console.log({ text: concatText, seIndexes: concatTextSlice });
//                 // setBoldText((p) => [
//                 //   ...p.filter((b) => b.text !== boldText[i].text),
//                 //   { text: concatText, seIndexes: concatTextSlice },
//                 // ]);
//                 setBoldText((p) => [
//                   ...p.filter(
//                     (b) =>
//                       b.seIndexes[0] !== boldText[i].seIndexes[0] &&
//                       b.seIndexes[1] !== boldText[i].seIndexes[1],
//                   ),
//                   { text: concatText, seIndexes: concatTextSlice },
//                 ]);
//                 setSelectedText({ text: '', seIndexes: [0, 0] });

//                 // replaceWordWithBold(updatedText, concatTextSlice[0], concatTextSlice[1]);
//               }
//             }
//           }
//           setStatus(true);
//         } else {
//           setBoldText((p) => [...p, selectedText]);
//           setSelectedText({ text: '', seIndexes: [0, 0] });
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     // if (boldText.length > 0) {
//     // console.log({ content });
//     // console.log({ boldText });
//     replaceWithBoldText(content, boldText);
//     // }
//   }, [boldText]);

//   useEffect(() => {
//     // console.log({ status });
//     if (status) {
//       // console.log({ updatedBoldText: boldText });
//       overlapCheck();
//     }
//   }, [status]);

//   useEffect(() => {
//     if (caretPos.current !== null && divRef.current !== null) {
//       setCaret(divRef.current, caretPos.current);
//       divRef.current.focus();
//     }
//   }, [content]);

//   // useEffect(() => {
//   //   if (divRef.current) {
//   //     divRef.current.focus();
//   //   }
//   // }, [updatedText]);

// const replaceWithBoldText = (text: string, boldText: SelectedText[]) => {
//   let newText = text;

//   const sortedBoldText = [...boldText].sort((a, b) => a.seIndexes[0] - b.seIndexes[0]);
//   // const sortedBoldText = [...boldText];
//   // console.log({ unsortedBoldText: boldText });
//   // console.log({ sortedBoldText });

//   for (let i = 0; i < sortedBoldText.length; i++) {
//     if (i === 0) {
//       newText =
//         newText.slice(0, sortedBoldText[i].seIndexes[0]) +
//         `<b>${sortedBoldText[i].text}</b>` +
//         newText.slice(sortedBoldText[i].seIndexes[1]);
//     } else if (i > 0) {
//       newText =
//         newText.slice(0, sortedBoldText[i].seIndexes[0] + i * 7) +
//         `<b>${sortedBoldText[i].text}</b>` +
//         newText.slice(sortedBoldText[i].seIndexes[1] + i * 7);
//     }
//     // console.log({ newText });
//   }
//   setUpdatedText(newText);
// };

//   // console.log({ selectedText });

//   // console.log({ content });
//   // console.log({ updatedText });
//   // console.log({ boldText });
//   // console.log('++++++++++++++++++++++++++++++++++++++++++++++++++');
//   // console.log(parse(updatedText));

//   const handleBlur = useCallback(() => {
//     const timeoutId = setTimeout(() => {
//       setBolded(false);
//       setSelectedText({ text: '', seIndexes: [0, 0] });
//       // console.log('blur');
//     }, 100);

//     return () => clearTimeout(timeoutId);
//   }, []);

//   const handleChange: React.FormEventHandler<HTMLDivElement> = useCallback(
//     async (e) => {
//       e.preventDefault();
//       // console.log('handleChange');

//       const divEl = e.target as HTMLDivElement;

//       const { text, tempBoldText } = transformPostBody(divEl.innerHTML);

//       caretPos.current = getCaret(divEl);

//       // console.log(text);
//       // console.log(divEl.innerHTML);
//       // console.log(tempBoldText);

//       await Promise.all([
//         // setContent(text.toString().replace(/&nbsp;/g, ' ')),
//         // setUpdatedText(divEl.innerHTML.toString().replace(/&nbsp;/g, ' ')),
//         setContent(text),
//         setUpdatedText(divEl.innerHTML),
//         setBoldText(tempBoldText),
//       ]);
//     },
//     [divRef],
//   );

//   // console.log('updated');

//   // copy/paste text must have " " but not &nbsp;
//   // if copy/paste text then caret moving to start
//   // fix onBlur

//   return (
//     <div>
//       <div className='flex flex-col w-full gap-2'>
//         <div className='flex items-center gap-1 px-3 bg-white shadow-md rounded-xl'>
//           <button
//             type='button'
//             className={clsx(
//               'flex items-center justify-center w-8 h-8 font-bold text-gray-800  rounded-md hover:bg-gray-100',
//               {
//                 'bg-gray-200 hover:bg-gray-200': bolded,
//               },
//             )}
//             onClick={createBoldText}
//           >
//             B
//           </button>
//           <button
//             type='button'
//             className={clsx(
//               'flex items-center justify-center w-8 h-8 italic text-gray-800 rounded-md hover:bg-gray-100',
//             )}
//           >
//             I
//           </button>
//           <button
//             type='button'
//             className={clsx(
//               'flex items-center justify-center w-8 h-8 underline text-gray-800  rounded-md hover:bg-gray-100',
//             )}
//           >
//             U
//           </button>
//         </div>
//         <TextField
//           divRef={divRef}
//           selectText={selectText}
//           updatedText={updatedText}
//           handleChange={handleChange}
//           handleBlur={handleBlur}
//         />
//       </div>
//     </div>
//   );
// }

// type TextFieldProps = {
//   handleChange: React.FormEventHandler<HTMLDivElement>;
//   divRef: React.RefObject<HTMLDivElement>;
//   selectText: () => void;
//   handleBlur: () => void;
//   updatedText: string;
// };

// const TextField = React.memo(
//   ({ divRef, selectText, updatedText, handleChange, handleBlur }: TextFieldProps) => {
//     return (
//       <div className='relative'>
//         {updatedText.length === 0 ? (
//           <div className='absolute p-5 text-[#9ca3af] text-xl'>Enter some text ...</div>
//         ) : null}
//         <div
//           className='w-full min-h-[300px] max-h-[600px] p-5 bg-white rounded-xl overflow-y-scroll text-black'
//           contentEditable
//           onInput={handleChange}
//           ref={divRef}
//           onMouseUp={selectText}
//           key='div'
//           onBlur={handleBlur}
//           dangerouslySetInnerHTML={{ __html: updatedText }}
//         />
//       </div>
//     );
//   },
// );
'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { SelectedText } from '@/types';

type TextEditor = {
  text: string;
  updatedText: string;
  setUpdatedText: React.Dispatch<React.SetStateAction<string>>;
};

type SpecText = 'bold' | 'italic' | 'underlined';

export default function TextEditor({ text, updatedText, setUpdatedText }: TextEditor) {
  // console.log(/<b>(.*?)<\/b>/g.exec(updatedText));

  const getCleanText = (text: string): string => {
    return text.replace(/<\/?[^>]+(>|$)/g, '');
  };
  const decompositionOfBoldText = (input: string) => {
    // console.log(input);
    // console.log(content);

    const boldRegex = /<b>(.*?)<\/b>/g;
    let match;
    const cleanInput = input.replace(/<i>|<\/i>/g, '').replace(/<u>|<\/u>/g, '');
    const tempBoldText: SelectedText[] = [];
    // console.log(boldRegex.exec(input));
    // console.log(boldRegex.exec(input));

    let i = 0;
    while ((match = boldRegex.exec(cleanInput)) !== null) {
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
    return tempBoldText;
  };
  const decompositionOfItalicText = (input: string) => {
    const italicRegex = /<i>(.*?)<\/i>/g;
    let match;
    const cleanInput = input.replace(/<b>|<\/b>/g, '').replace(/<u>|<\/u>/g, '');
    const tempItalicText: SelectedText[] = [];

    let i = 0;
    while ((match = italicRegex.exec(cleanInput)) !== null) {
      // console.log(match);
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
      // console.log(match);
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

  // console.log(post);

  const [selectedText, setSelectedText] = useState<SelectedText>({ text: '', seIndexes: [0, 0] });
  const [content, setContent] = useState(getCleanText(text));

  const [boldText, setBoldText] = useState<SelectedText[]>(decompositionOfBoldText(text));
  const [italicText, setItalicText] = useState<SelectedText[]>(decompositionOfItalicText(text));
  const [underlinedText, setUnderlinedText] = useState<SelectedText[]>(
    decompositionOfUnderlinedText(text),
  );

  const [currentTag, setCurrentTag] = useState<SpecText | ''>('');

  const [bolded, setBolded] = useState(false);
  const [italicized, setItalicized] = useState(false);
  const [underlined, setUnderlined] = useState(false);

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
    // return (a[0] > b[0] && a[0] < b[1]) || (b[0] > a[0] && b[0] < a[1]) ? true : false;
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
    const setFunc = setSpecTexts[specText];
    // console.log(boldT);
    // console.log(selectedText);
    const slice1: [number, number] = [specT.seIndexes[0], selectedText.seIndexes[0]];
    const slice2: [number, number] = [selectedText.seIndexes[1], specT.seIndexes[1]];
    const newEls = [
      { text: content.slice(...slice1), seIndexes: slice1 },
      { text: content.slice(...slice2), seIndexes: slice2 },
    ].filter((el) => el.text !== '');
    // console.log([
    //   ...boldText.filter(
    //     (el) => el.seIndexes[0] !== boldT.seIndexes[0] && el.seIndexes[1] !== boldT.seIndexes[1],
    //   ),
    //   ...newEls,
    // ]);
    setFunc((p) => [
      ...p.filter(
        (el) => el.seIndexes[0] !== specT.seIndexes[0] && el.seIndexes[1] !== specT.seIndexes[1],
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
    // console.log(el);
    // console.log(pos);

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

  const selectText = useCallback(() => {
    setBolded(false);
    setItalicized(false);
    setUnderlined(false);
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

    // const selText = selection.toString().replace('&nbsp;', '')
    // console.log({ text: selection.toString() }, selStart, selEnd);
    setSelectedText({ text: selection.toString(), seIndexes: [selStart, selEnd] });

    if (boldText.length > 0) if (isSpecText([selStart, selEnd], 'bold')) setBolded(true);

    if (italicText.length > 0) if (isSpecText([selStart, selEnd], 'italic')) setItalicized(true);

    if (underlinedText.length > 0)
      if (isSpecText([selStart, selEnd], 'underlined')) setUnderlined(true);
  }, [divRef]);
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

  const overlapCheck = (specText: SpecText) => {
    // console.log({ overlapCheckBoldText: boldText });
    let arr = specTexts[specText];
    const setFunc = setSpecTexts[specText];

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
        // replaceWithBoldText();
      } else {
        if (specialTextSomeOverlap(specText)) {
          // console.log('Enter');
          // console.log(status);

          if (isSpecText(selectedText.seIndexes, specText)) {
            // console.log('unbold');
            splitSpecTextEl(specText);
          } else {
            // console.log('bold');
            for (let i = 0; i < value.length; i++) {
              // console.log({ selectedText });
              // console.log(boldText[i]);
              if (isOverlap(value[i].seIndexes, selectedText.seIndexes)) {
                // console.log('isOverlap');
                const concatTextSlice = concatOverlappingText(value[i], selectedText);
                const concatText = content.slice(...concatTextSlice);
                // console.log({ text: concatText, seIndexes: concatTextSlice });
                // setBoldText((p) => [
                //   ...p.filter((b) => b.text !== boldText[i].text),
                //   { text: concatText, seIndexes: concatTextSlice },
                // ]);
                setFunc((p) => [
                  ...p.filter(
                    (b) =>
                      b.seIndexes[0] !== value[i].seIndexes[0] &&
                      b.seIndexes[1] !== value[i].seIndexes[1],
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
          setFunc((p) => [...p, selectedText]);
          setSelectedText({ text: '', seIndexes: [0, 0] });
        }
      }
    }
  };

  useEffect(() => {
    // if (boldText.length > 0) {
    // console.log({ content });
    // console.log({ boldText });
    if (currentTag !== '') {
      console.log('replace');
      replaceWithSpecText(content);
    }
    // }
  }, [boldText, italicText, underlinedText]);

  useEffect(() => {
    // console.log({ status });
    if (status) {
      if (currentTag !== '') {
        console.log('overlap');
        // console.log({ updatedBoldText: boldText });
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

  // useEffect(() => {
  //   if (divRef.current) {
  //     divRef.current.focus();
  //   }
  // }, [updatedText]);

  // const replaceWithSpecText = (text: string, specText: SpecText) => {
  //   let newText = text;

  //   const specTags = {
  //     bold: 'b',
  //     italic: 'i',
  //     underlined: 'u',
  //   };
  //   const curTag = specTags[specText];

  //   const sortedSpecText = [...specTexts[specText]].sort((a, b) => a.seIndexes[0] - b.seIndexes[0]);
  //   // console.log({ unsortedBoldText: boldText });
  //   console.log({ sortedSpecText });

  //   console.log({ newText });

  //   for (let i = 0; i < sortedSpecText.length; i++) {
  //     if (i === 0) {
  //       newText =
  //         newText.slice(0, sortedSpecText[i].seIndexes[0]) +
  //         `<${curTag}>${sortedSpecText[i].text}</${curTag}>` +
  //         newText.slice(sortedSpecText[i].seIndexes[1]);
  //     } else if (i > 0) {
  //       newText =
  //         newText.slice(0, sortedSpecText[i].seIndexes[0] + i * 7) +
  //         `<${curTag}>${sortedSpecText[i].text}</${curTag}>` +
  //         newText.slice(sortedSpecText[i].seIndexes[1] + i * 7);
  //     }
  //     console.log({ newText });
  //   }
  //   // setUpdatedText(newText);
  // };

  const replaceWithSpecText = (text: string) => {
    const newBoldText = boldText.map((boldT) => ({
      ...boldT,
      tag: 'b',
    }));
    const newItalicText = italicText.map((italicT) => ({
      ...italicT,
      tag: 'i',
    }));
    const newUnderlinedText = underlinedText.map((underlinedT) => ({
      ...underlinedT,
      tag: 'u',
    }));

    const commonTags = [...newBoldText, ...newItalicText, ...newUnderlinedText].sort(
      (a, b) => a.seIndexes[0] - b.seIndexes[0],
    );

    // console.log(commonTags);
    let arr = commonTags;
    // Check if some elements overlap others and if so than concat them
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (i !== j) {
          if (isOverlap(arr[i].seIndexes, arr[j].seIndexes)) {
            if (arr[i].tag === arr[j].tag) {
              const concatTextSlice = concatOverlappingText(arr[i], arr[j]);
              const concatText = content.slice(...concatTextSlice);

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

    console.log(arr);
    // Check if some specText have the same text and if so than create multi tag like <u><i>text...</i></u>
    // for (let i = 0; i < arr.length; i++) {
    //   for (let j = 0; j < arr.length; j++) {
    //     if (i !== j) {
    //       if (
    //         arr[i].seIndexes[0] === arr[j].seIndexes[0] &&
    //         arr[i].seIndexes[1] === arr[j].seIndexes[1]
    //       ) {
    //         console.log(arr[i]);
    //         console.log(arr[j]);
    //         console.log(
    //           `<${arr[j].tag}><${arr[i].tag}>${arr[i].text}</${arr[i].tag}></${arr[j].tag}>`,
    //         );

    //         arr = [
    //           ...arr
    //             .filter(
    //               (el) =>
    //                 !(
    //                   el.seIndexes[0] === arr[i].seIndexes[0] &&
    //                   el.seIndexes[1] === arr[i].seIndexes[1] &&
    //                   el.text === arr[i].text
    //                 ),
    //             )
    //             .filter(
    //               (el) =>
    //                 !(
    //                   el.seIndexes[0] === arr[j].seIndexes[0] &&
    //                   el.seIndexes[1] === arr[j].seIndexes[1] &&
    //                   el.text === arr[j].text
    //                 ),
    //             ),

    //           { text: arr[i].text, seIndexes: arr[i].seIndexes, tag: [arr[i].tag, arr[j].tag] },
    //         ];
    //       }
    //     }
    //   }
    // }
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

    console.log(result);
    // console.log(updatedText);
  };
  // replaceWithSpecText(content);
  // console.log({ selectedText });

  const handleBlur = useCallback(() => {
    const timeoutId = setTimeout(() => {
      setBolded(false);
      setItalicized(false);
      setUnderlined(false);
      setSelectedText({ text: '', seIndexes: [0, 0] });
      // console.log('blur');
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleChange: React.FormEventHandler<HTMLDivElement> = useCallback(
    async (e) => {
      e.preventDefault();
      // console.log('handleChange');

      const divEl = e.target as HTMLDivElement;

      const text = getCleanText(divEl.innerHTML);
      const tempBoldText = decompositionOfBoldText(divEl.innerHTML);
      const tempItalicText = decompositionOfItalicText(divEl.innerHTML);
      const tempUnderlinedText = decompositionOfUnderlinedText(divEl.innerHTML);

      caretPos.current = getCaret(divEl);

      // console.log(text);
      // console.log(divEl.innerHTML);
      // console.log(tempBoldText);

      await Promise.all([
        // setContent(text.toString().replace(/&nbsp;/g, ' ')),
        // setUpdatedText(divEl.innerHTML.toString().replace(/&nbsp;/g, ' ')),
        setContent(text),
        setUpdatedText(divEl.innerHTML),
        setBoldText(tempBoldText),
        setItalicText(tempItalicText),
        setUnderlinedText(tempUnderlinedText),
      ]);
    },
    [divRef],
  );

  // console.log({ content });
  // console.log({ updatedText });
  console.log({ boldText });
  console.log({ italicText });
  console.log({ underlinedText });
  console.log('=================================');
  // console.log('updated');

  // copy/paste text must have " " but not &nbsp;
  // if copy/paste text then caret moving to start
  // fix onBlur

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
              {
                'bg-gray-200 hover:bg-gray-200': italicized,
              },
            )}
            onClick={() => createSpecText('italic')}
          >
            I
          </button>
          <button
            type='button'
            className={clsx(
              'flex items-center justify-center w-8 h-8 underline text-gray-800  rounded-md hover:bg-gray-100',
              {
                'bg-gray-200 hover:bg-gray-200': underlined,
              },
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
