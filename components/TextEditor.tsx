// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import parse from 'html-react-parser';
// import clsx from 'clsx';
// const text = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi, omnis amet.';

// type SelectedText = {
//   text: string;
//   seIndexes: [number, number];
// };

// export default function TextEditor() {
//   const [selectedText, setSelectedText] = useState<SelectedText>({ text: '', seIndexes: [0, 0] });
//   const [boldText, setBoldText] = useState<SelectedText[]>([
//     // { text: 'ipsum', seIndexes: [6, 11] },
//     // { text: 'amet consectetur', seIndexes: [23, 39] },
//   ]);
//   const [bolded, setBolded] = useState(false);
//   const [updatedText, setUpdatedText] = useState(text);
//   const [status, setStatus] = useState(false);
//   const divRef = useRef(null);
//   // const textWithoutTags = updatedText.replace(/<\/?[^>]+(>|$)/g, '');

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
//     boldText.some((el) => {
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

//   const selectText = () => {
//     setBolded(false);
//     const div = divRef.current;
//     if (!div) return -1; // Проверка, что div существует

//     const selection = window.getSelection() as Selection;
//     if (selection.rangeCount === 0) return -1; // Проверка, что текст выделен
//     if (selection.toString() === '') return -1;

//     const range = selection.getRangeAt(0);
//     const preSelectionRange = range.cloneRange();
//     preSelectionRange.selectNodeContents(div);
//     preSelectionRange.setEnd(range.startContainer, range.startOffset);

//     const selStart = preSelectionRange.toString().length;
//     const selEnd = selStart + selection.toString().length;

//     // console.log({ text: selection.toString() }, selStart, selEnd);
//     setSelectedText({ text: selection.toString(), seIndexes: [selStart, selEnd] });

//     if (boldText.length > 0) {
//       console.log(isBolded([selStart, selEnd]));

//       if (isBolded([selStart, selEnd])) {
//         setBolded(true);
//       }
//     }
//   };

//   const overlapCheck = () => {
//     // console.log({ overlapCheckBoldText: boldText });
//     let arr = boldText;

//     for (let i = 0; i < arr.length; i++) {
//       for (let j = 0; j < arr.length; j++) {
//         if (i !== j) {
//           if (isOverlap(arr[i].seIndexes, arr[j].seIndexes)) {
//             const concatTextSlice = concatOverlappingText(arr[i], arr[j]);
//             const concatText = text.slice(...concatTextSlice);

//             // console.log(arr[i].text);
//             // console.log(arr[j].text);
//             // console.log({ concatTextSlice }, { concatText });
//             // console.log({ arr1: arr });

//             arr = [
//               ...arr.filter((el) => el.text !== arr[i].text && el.text !== arr[j].text),
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
//         setBoldText((p) => [...p, selectedText]);
//         setSelectedText({ text: '', seIndexes: [0, 0] });
//         // replaceWithBoldText();
//       } else {
//         if (boldTextSomeOverlap()) {
//           // console.log('Enter');
//           // console.log(status);
//           // if(isBolded(selectedText.seIndexes)){ unbold } else
//           //
//           //
//           for (let i = 0; i < boldText.length; i++) {
//             // console.log({ selectedText });
//             // console.log(boldText[i]);
//             if (isOverlap(boldText[i].seIndexes, selectedText.seIndexes)) {
//               // console.log('isOverlap');
//               const concatTextSlice = concatOverlappingText(boldText[i], selectedText);
//               const concatText = text.slice(...concatTextSlice);
//               // console.log(concatTextSlice);
//               // console.log(concatText);
//               setBoldText((p) => [
//                 ...p.filter((b) => b.text !== boldText[i].text),
//                 { text: concatText, seIndexes: concatTextSlice },
//               ]);
//               setSelectedText({ text: '', seIndexes: [0, 0] });

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
//     if (boldText.length > 0) {
//       // console.log({ boldText });
//       replaceWithBoldText(boldText);
//     }
//   }, [boldText]);

//   useEffect(() => {
//     // console.log({ status });
//     if (status) {
//       // console.log({ updatedBoldText: boldText });
//       overlapCheck();
//     }
//   }, [status]);

//   const replaceWithBoldText = (boldText: SelectedText[]) => {
//     let newText = text;

//     const sortedBoldText = [...boldText].sort((a, b) => a.seIndexes[0] - b.seIndexes[0]);
//     // const sortedBoldText = [...boldText];
//     // console.log({ unsortedBoldText: boldText });
//     // console.log({ sortedBoldText });

//     for (let i = 0; i < sortedBoldText.length; i++) {
//       if (i === 0) {
//         newText =
//           newText.slice(0, sortedBoldText[i].seIndexes[0]) +
//           `<b>${sortedBoldText[i].text}</b>` +
//           newText.slice(sortedBoldText[i].seIndexes[1]);
//       } else if (i > 0) {
//         newText =
//           newText.slice(0, sortedBoldText[i].seIndexes[0] + i * 7) +
//           `<b>${sortedBoldText[i].text}</b>` +
//           newText.slice(sortedBoldText[i].seIndexes[1] + i * 7);
//       }
//       // console.log({ newText });
//     }
//     setUpdatedText(newText);
//   };
//   //
//   // console.log({ selectedText });
//   // console.log({ boldText });
//   // console.log({ updatedText });
//   // console.log(parse(updatedText));
//   // console.log(boldText.sort((a,b)=> a.seIndexes[0] - b.seIndexes[0]));

//   // console.log(/<\/?[^>]+(>|$)/g.test('sdfsdfsd <b>dsdfsdf</b> sdfsdfsd'));

//   //================================================================
//   // Problems:
//   // 1)incorrect selectText when we have <div>...<b>...</b>...</div>
//   // 2) alternative for dangerouslySetInnerHTML

//   // Schema for removing boldText from BoldText state
//   // for (const boldT of boldText) {
//   //   if (isOverlap(selectedText.seIndexes, boldT.seIndexes)) {
//   //     const slice1: [number, number] = [boldT.seIndexes[0], selectedText.seIndexes[1]];
//   //     const slice2: [number, number] = [selectedText.seIndexes[1], boldT.seIndexes[1]];
//   //     const newEls = [
//   //       { text: text.slice(...slice1), seIndexes: slice1 },
//   //       { text: text.slice(...slice2), seIndexes: slice2 },
//   //     ];
//   //     console.log([...boldText.filter(el=> el.text !== boldT.text), ...newEls ]);

//   //     // setBoldText(p=> [...p.filter(el=> el.text !== boldT.text), ...newEls ])
//   //   }
//   // }

//   // boldText - [6, 17]
//   // selectedText - [9,11]
//   // res - [6, 9], [11,17]
//   //================================================================

//   //concat boldText elements which is neighboring like [6, 11] and [11, 17] = [6, 17]

//   const handleBlur = () => {
//     setTimeout(() => {
//       setBolded(false);
//       setSelectedText({ text: '', seIndexes: [0, 0] });
//       // console.log('blur');
//     }, 100);
//   };
//   return (
//     <>
//       <div className='p-2 bg-white shadow-md rounded-xl'>
//         <button
//           className={clsx(
//             'flex items-center justify-center w-8 h-8 font-bold text-gray-800  rounded-md hover:bg-gray-100',
//             {
//               'bg-gray-200 hover:bg-gray-200': bolded,
//             },
//           )}
//           onClick={createBoldText}
//         >
//           B
//         </button>
//       </div>
//       {/* <div onMouseUp={selectText} dangerouslySetInnerHTML={{ __html: updatedText }}></div> */}
//       <div
//         tabIndex={0}
//         ref={divRef}
//         onMouseUp={selectText}
//         // onBlur={() => console.log('out')}
//         onBlur={handleBlur}
//       >
//         {parse(updatedText)}
//       </div>
//       <div>
//         {boldText.map((el, i) => (
//           <div key={i}>{el.text}</div>
//         ))}
//       </div>
//     </>
//   );
// }
'use client';

import React, { useEffect, useRef, useState } from 'react';
import parse from 'html-react-parser';
import clsx from 'clsx';
const text = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi, omnis amet.';

type TextEditor = {
  text: string;
  boldText: SelectedText[];
};

export default function TextEditor() {
  const [selectedText, setSelectedText] = useState<SelectedText>({ text: '', seIndexes: [0, 0] });
  const [boldText, setBoldText] = useState<SelectedText[]>([
    // { text: 'ipsum', seIndexes: [6, 11] },
    // { text: 'amet consectetur', seIndexes: [23, 39] },
  ]);
  const [bolded, setBolded] = useState(false);
  const [updatedText, setUpdatedText] = useState(text);
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
      { text: text.slice(...slice1), seIndexes: slice1 },
      { text: text.slice(...slice2), seIndexes: slice2 },
    ].filter((el) => el.text !== '');
    console.log([...boldText.filter((el) => el.text !== boldT.text), ...newEls]);
    setBoldText((p) => [...p.filter((el) => el.text !== boldT.text), ...newEls]);
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
      console.log(isBolded([selStart, selEnd]));

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

  const handleBlur = () => {
    const time = setTimeout(() => {
      setBolded(false);
      setSelectedText({ text: '', seIndexes: [0, 0] });
      // console.log('blur');
    }, 100);
    clearTimeout(time);
  };
  return (
    <>
      <div className='flex flex-col w-full gap-2'>
        <div className='p-2 bg-white shadow-md rounded-xl'>
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
        </div>

        <div
          className='p-5 bg-white rounded-xl'
          tabIndex={0}
          contentEditable={true}
          onInput={(e) => console.log(e.target.textContent)}
          ref={divRef}
          onMouseUp={selectText}
          onBlur={handleBlur}
        >
          {parse(updatedText)}
        </div>
        <div>
          {boldText.map((el, i) => (
            <div key={i}>{el.text}</div>
          ))}
        </div>
      </div>
    </>
  );
}
