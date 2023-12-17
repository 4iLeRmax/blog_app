// 'use client';

// import React, { useEffect, useState } from 'react';

// const text = 'Lorem <b>ipsum dolor</b>, sit <b>amet consectetur</b> adipisicing elit. Sequi, omnis.';

// type SelectedText = {
//   text: string;
//   seIndexes: [number, number];
// };

// export default function TextEditor() {
//   const [selectedText, setSelectedText] = useState<SelectedText>({ text: '', seIndexes: [0, 0] });
//   const [boldText, setBoldText] = useState<SelectedText[]>([
//     { text: 'ipsum dolor', seIndexes: [6, 17] },
//     { text: 'amet consectetur', seIndexes: [23, 39] },
//   ]);
//   const [updatedText, setUpdatedText] = useState(text);
//   const [status, setStatus] = useState(false);
//   // const textWithoutTags = updatedText.replace(/<\/?[^>]+(>|$)/g, "");

//   const selectText = () => {
//     const sel = window?.getSelection() as Selection;
//     const selStart = sel?.anchorOffset as number;
//     const selEnd = sel?.focusOffset as number;

//     if (sel.toString() !== '') {
//       // console.log(sel.toString());
//       if (selEnd > selStart) {
//         setSelectedText({ text: sel.toString(), seIndexes: [selStart, selEnd] });
//       } else if (selStart > selEnd) {
//         setSelectedText({ text: sel.toString(), seIndexes: [selEnd, selStart] });
//       }
//     }
//   };

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

//   // const removeDuplicateObjects = (arr: SelectedText[]) => {
//   //   return arr.filter(
//   //     (obj, index, self) =>
//   //       index === self.findIndex((o) => JSON.stringify(o) === JSON.stringify(obj)),
//   //   );
//   // };

//   // const finalConcatBoldText = () => {
//   //   // console.log(boldText);

//   //   for (let i = 0; i < boldText.length; i++) {
//   //     boldText.forEach((boldT) => {
//   //       // console.log(isOverlap(boldText[i].seIndexes, boldT.seIndexes));
//   //       if (boldText[i].text !== boldT.text && isOverlap(boldText[i].seIndexes, boldT.seIndexes)) {
//   //         // console.log(boldText[i]);

//   //         //   // console.log('isOverlap');
//   //         const concatTextSlice = concatOverlappingText(boldText[i], boldT);
//   //         const concatText = text.slice(...concatTextSlice);
//   //         //   // console.log(concatTextSlice);
//   //         //   // console.log(concatText);
//   //         // if (!boldText.some((bt) => bt.text === concatText)) {
//   //         setBoldText((p) => [
//   //           ...p.filter((b) => b.text !== boldText[i].text),
//   //           { text: concatText, seIndexes: concatTextSlice },
//   //         ]);
//   //         // removeDuplicateObjects();
//   //         // }
//   //       }
//   //     });
//   //   }
//   // };

//   // const overlapCheck = () => {
//   //   console.log(boldText);

//   //   for (let i = 0; i < boldText.length; i++) {
//   //     for (let j = 0; j < boldText.length; j++) {
//   //       if (i !== j) {
//   //         if (isOverlap(boldText[i].seIndexes, boldText[j].seIndexes)) {
//   //           const concatTextSlice = concatOverlappingText(boldText[i], boldText[j]);
//   //           const concatText = updatedText.slice(...concatTextSlice);

//   //           console.log(boldText[i].text);
//   //           console.log(boldText[j].text);
//   //           // console.log({ concatTextSlice }, { concatText });

//   //           setBoldText((p) => {
//   //             console.log({ p1: p });

//   //             console.log({
//   //               p2: [
//   //                 ...p.filter((el) => el.text !== boldText[i].text && el.text !== boldText[j].text),
//   //                 { text: concatText, seIndexes: concatTextSlice },
//   //               ],
//   //             });
//   //             return [
//   //               ...p.filter((el) => el.text !== boldText[i].text && el.text !== boldText[j].text),
//   //               { text: concatText, seIndexes: concatTextSlice },
//   //             ];
//   //           });
//   //         }
//   //       }
//   //     }
//   //   }
//   //   // console.log(boldText);

//   //   // console.log('=================================');
//   // };
//   const overlapCheck = () => {
//     console.log(boldText);
//     let arr = boldText;

//     for (let i = 0; i < arr.length; i++) {
//       for (let j = 0; j < arr.length; j++) {
//         if (i !== j) {
//           if (isOverlap(arr[i].seIndexes, arr[j].seIndexes)) {
//             const concatTextSlice = concatOverlappingText(arr[i], arr[j]);
//             const concatText = updatedText.slice(...concatTextSlice);

//             console.log(arr[i].text);
//             console.log(arr[j].text);
//             // console.log({ concatTextSlice }, { concatText });

//             console.log({ arr1: arr });

//             arr = [
//               ...arr.filter((el) => el.text !== arr[i].text && el.text !== arr[j].text),
//               { text: concatText, seIndexes: concatTextSlice },
//             ];
//             console.log({ arr2: arr });
//           }
//         }
//       }
//     }
//     setBoldText(arr);
//     setStatus(false);
//     // console.log(boldText);

//     // console.log('=================================');
//   };

//   const boldTextSomeOverlap = () =>
//     boldText.some((el) => isOverlap(el.seIndexes, selectedText.seIndexes));

//   // status error not change

//   const createBoldText = () => {
//     if (selectedText.text !== '') {
//       if (boldText.length === 0) {
//         setBoldText((p) => [...p, selectedText]);
//       } else {
//         if (boldTextSomeOverlap()) {
//           console.log('Enter');

//           // console.log(status);

//           for (let i = 0; i < boldText.length; i++) {
//             // console.log({ selectedText });
//             // console.log(boldText[i]);

//             if (isOverlap(boldText[i].seIndexes, selectedText.seIndexes)) {
//               // console.log('isOverlap');

//               const concatTextSlice = concatOverlappingText(boldText[i], selectedText);
//               const concatText = updatedText.slice(...concatTextSlice);
//               // console.log(concatTextSlice);
//               // console.log(concatText);

//               setBoldText((p) => [
//                 ...p.filter((b) => b.text !== boldText[i].text),
//                 { text: concatText, seIndexes: concatTextSlice },
//               ]);
//               // replaceWordWithBold(updatedText, concatTextSlice[0], concatTextSlice[1]);
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
//     console.log({ status });

//     if (status) {
//       // console.log({ updatedBoldText: boldText });
//       overlapCheck();
//     }
//   }, [status]);

//   // const replaceWordWithBold = (text: string, startIndex: number, endIndex: number) => {
//   //   const wordToReplace = text.slice(startIndex, endIndex);

//   //   const replacement = `<b>${wordToReplace}</b>`;

//   //   const newText = text.slice(0, startIndex) + replacement + text.slice(endIndex);

//   //   console.log(newText);

//   //   setUpdatedText(newText);
//   // };

//   const replaceWithBoldText = ()=> {
//     // let updText = updatedText;
//     // console.log(textWithoutTags);

//     // for(const text of boldText){

//     // }
//   }

//   // console.log({ selectedText });
//   // console.log({ boldText });

//   return (
//     <>
//       <button
//         className='flex items-center justify-center w-8 h-8 font-bold text-white bg-blue-500 rounded-md'
//         onClick={createBoldText}
//       >
//         B
//       </button>
//       <button
//         className='flex items-center justify-center h-8 px-5 font-bold text-white bg-blue-500 rounded-md'
//         onClick={replaceWithBoldText}
//       >
//         Start
//       </button>
//       <div onMouseUp={selectText} dangerouslySetInnerHTML={{__html: updatedText}}></div>
//       <div>
//         {boldText.map((el, i) => (
//           <div key={i}>{el.text}</div>
//         ))}
//       </div>
//       {/* <div onMouseUp={selectText} dangerouslySetInnerHTML={{ __html: updatedText }}></div> */}
//     </>
//   );
// }
'use client';

import React, { useEffect, useRef, useState } from 'react';
import parse from 'html-react-parser';
const text = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi, omnis amet.';

type SelectedText = {
  text: string;
  seIndexes: [number, number];
};

export default function TextEditor() {
  const [selectedText, setSelectedText] = useState<SelectedText>({ text: '', seIndexes: [0, 0] });
  const [boldText, setBoldText] = useState<SelectedText[]>([
    // { text: 'ipsum', seIndexes: [6, 11] },
    // { text: 'amet consectetur', seIndexes: [23, 39] },
  ]);
  const [updatedText, setUpdatedText] = useState(text);
  const [status, setStatus] = useState(false);
  const divRef = useRef(null);
  // const textWithoutTags = updatedText.replace(/<\/?[^>]+(>|$)/g, '');

  // "amet"
  // [23, 27]
  // const selectText = () => {
  //   // const sel = window?.getSelection() as Selection;
  //   // // const sel = textRef?.current?.getSelection() as Selection;
  //   // const selStart = sel?.anchorOffset as number;
  //   // const selEnd = sel?.focusOffset as number;
  //   // if (sel.toString() !== '') {
  //   //   // console.log(sel.toString());
  //   //   if (selEnd > selStart) {
  //   //     setSelectedText({ text: sel.toString(), seIndexes: [selStart, selEnd] });
  //   //   } else if (selStart > selEnd) {
  //   //     setSelectedText({ text: sel.toString(), seIndexes: [selEnd, selStart] });
  //   //   }
  //   // }

  //   const selection = window.getSelection() as Selection;

  //   if (!selection.rangeCount) {
  //     return null;
  //   }

  //   const range = selection.getRangeAt(0);
  //   const clonedRange = range.cloneRange();

  //   const tempContainer = document.createElement('div');
  //   tempContainer.appendChild(clonedRange.cloneContents());

  //   const newRange = document.createRange();

  //   // Если предыдущий узел - тег B, устанавливаем начальную точку после тега
  //   if (tempContainer.firstChild && tempContainer.firstChild.nodeName === 'B') {
  //       newRange.setStart(tempContainer.firstChild.firstChild, range.startOffset);
  //   } else {
  //       newRange.setStart(tempContainer, 0);
  //   }

  //   // Если следующий узел - тег B, устанавливаем конечную точку после тега
  //   if (tempContainer.lastChild && tempContainer.lastChild.nodeName === 'B') {
  //       newRange.setEnd(tempContainer.lastChild.firstChild, range.endOffset);
  //   } else {
  //       newRange.setEnd(tempContainer, tempContainer.childNodes.length);
  //   }

  //   const startOffset = newRange.startOffset;
  //   const endOffset = newRange.endOffset;

  //   console.log([selection.toString(), startOffset, endOffset]);

  //   // const selection = window.getSelection() as Selection;

  //   // if (!selection.rangeCount) {
  //   //   return null;
  //   // }

  //   // const range = selection.getRangeAt(0);
  //   // const clonedRange = range.cloneRange();

  //   // // console.log(range);
  //   // // console.log(clonedRange.cloneContents());

  //   // // Создаем временный контейнер для клонированного диапазона
  //   // const tempContainer = document.createElement('div');
  //   // tempContainer.appendChild(clonedRange.cloneContents());

  //   // // Создаем новый диапазон внутри временного контейнера
  //   // const newRange = document.createRange();
  //   // newRange.selectNodeContents(tempContainer);

  //   // // Получаем координаты выделенного текста
  //   // const startOffset = newRange.startOffset + range.startOffset;
  //   // const endOffset = newRange.startOffset + range.endOffset;

  //   // console.log([selection.toString(), startOffset, endOffset]);

  //   // // setSelectedText({ text: selection.toString(), seIndexes: [startOffset, endOffset] });
  // };

  const selectText = () => {
    const div = divRef.current;
    if (!div) return -1; // Проверка, что div существует

    const selection = window.getSelection() as Selection;
    if (selection.rangeCount === 0) return -1; // Проверка, что текст выделен
    if(selection.toString() === '') return -1

    const range = selection.getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(div);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);

    const selStart = preSelectionRange.toString().length;
    const selEnd = selStart + selection.toString().length;

    // console.log(selection.toString(), selStart, selEnd);
   setSelectedText({text: selection.toString(), seIndexes: [selStart, selEnd]});
    // if (sel.toString() !== '') {
    //   let currentSeIndexes: [number, number] = [0, 0];

    //   if (selEnd > selStart) {
    //     currentSeIndexes = [selStart, selEnd];
    //   } else if (selStart > selEnd) {
    //     currentSeIndexes = [selEnd, selStart];
    //   }
    //   if (boldText.length > 0) {
    //     console.log([sel.toString(), currentSeIndexes[0], currentSeIndexes[1]]);
    //     // const indexesBefore = Math.max(...boldText.map((el) => el.seIndexes[1]));
    //     // setSelectedText({
    //     //   text: sel.toString(),
    //     //   seIndexes: [currentSeIndexes[0] + indexesBefore, currentSeIndexes[1] + indexesBefore],
    //     // });
    //   } else if (boldText.length === 0) {
    //     setSelectedText({ text: sel.toString(), seIndexes: [...currentSeIndexes] });
    //   }
    // }
  };

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

  const overlapCheck = () => {
    // console.log({ overlapCheckBoldText: boldText });
    let arr = boldText;

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (i !== j) {
          if (isOverlap(arr[i].seIndexes, arr[j].seIndexes)) {
            const concatTextSlice = concatOverlappingText(arr[i], arr[j]);
            const concatText = text.slice(...concatTextSlice);

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

  const boldTextSomeOverlap = () =>
    boldText.some((el) => isOverlap(el.seIndexes, selectedText.seIndexes));

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
          for (let i = 0; i < boldText.length; i++) {
            // console.log({ selectedText });
            // console.log(boldText[i]);
            if (isOverlap(boldText[i].seIndexes, selectedText.seIndexes)) {
              // console.log('isOverlap');
              const concatTextSlice = concatOverlappingText(boldText[i], selectedText);
              const concatText = text.slice(...concatTextSlice);
              // console.log(concatTextSlice);
              // console.log(concatText);
              setBoldText((p) => [
                ...p.filter((b) => b.text !== boldText[i].text),
                { text: concatText, seIndexes: concatTextSlice },
              ]);
              setSelectedText({ text: '', seIndexes: [0, 0] });

              // replaceWordWithBold(updatedText, concatTextSlice[0], concatTextSlice[1]);
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
    if (boldText.length > 0) {
      // console.log({ boldText });
      replaceWithBoldText(boldText);
    }
  }, [boldText]);

  useEffect(() => {
    // console.log({ status });
    if (status) {
      // console.log({ updatedBoldText: boldText });
      overlapCheck();
    }
  }, [status]);

  const replaceWithBoldText = (boldText: SelectedText[]) => {
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
  //
  // console.log({ selectedText });
  // console.log({ boldText });
  // console.log({ updatedText });
  // console.log(parse(updatedText));
  // console.log(boldText.sort((a,b)=> a.seIndexes[0] - b.seIndexes[0]));

  // console.log(/<\/?[^>]+(>|$)/g.test('sdfsdfsd <b>dsdfsdf</b> sdfsdfsd'));

  //================================================================
  // Problems:
  // 1)incorrect selectText when we have <div>...<b>...</b>...</div>
  // 2) alternative for dangerouslySetInnerHTML

  // Schema for removing boldText from BoldText state
  // for (const boldT of boldText) {
  //   if (isOverlap(selectedText.seIndexes, boldT.seIndexes)) {
  //     const slice1: [number, number] = [boldT.seIndexes[0], selectedText.seIndexes[1]];
  //     const slice2: [number, number] = [selectedText.seIndexes[1], boldT.seIndexes[1]];
  //     const newEls = [
  //       { text: text.slice(...slice1), seIndexes: slice1 },
  //       { text: text.slice(...slice2), seIndexes: slice2 },
  //     ];
  //     console.log([...boldText.filter(el=> el.text !== boldT.text), ...newEls ]);

  //     // setBoldText(p=> [...p.filter(el=> el.text !== boldT.text), ...newEls ])
  //   }
  // }

  // boldText - [6, 17]
  // selectedText - [9,11]
  // res - [6, 9], [11,17]
  //================================================================



  return (
    <>
      <button
        className='flex items-center justify-center w-8 h-8 font-bold text-white bg-blue-500 rounded-md'
        onClick={createBoldText}
      >
        B
      </button>
      {/* <div onMouseUp={selectText} dangerouslySetInnerHTML={{ __html: updatedText }}></div> */}
      <div ref={divRef} onMouseUp={selectText}>
        {parse(updatedText)}
      </div>
      <div>
        {boldText.map((el, i) => (
          <div key={i}>{el.text}</div>
        ))}
      </div>
      {/* <TestComp /> */}
    </>
  );
}

// const TestComp = () => {
//   const addSpan = (range) => {
//     var newParent = document.createElement('span');
//     newParent.classList.add('word');
//     range.surroundContents(newParent);
//     // console.log(range.surroundContents(newParent));
//   };

//   return (
//     <>
//       <div
//         id='text'
//         onClick={() => {
//           if (window.getSelection) {
//             var sel = window.getSelection(),
//               range = sel.getRangeAt(0).cloneRange();

//             sel.anchorNode.parentElement.className != 'word'
//               ? addSpan(range)
//               : console.log('Already tagged');
//           }
//         }}
//       >
//         lorem ipsum Benny
//       </div>
//       <button id='btn'>Add span tag to selection</button>
//     </>
//   );
// };
