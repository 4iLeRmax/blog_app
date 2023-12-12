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

import React, { useEffect, useState } from 'react';

const text = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi, omnis.';

type SelectedText = {
  text: string;
  seIndexes: [number, number];
};

export default function TextEditor() {
  const [selectedText, setSelectedText] = useState<SelectedText>({ text: '', seIndexes: [0, 0] });
  const [boldText, setBoldText] = useState<SelectedText[]>([
    // { text: 'ipsum dolor', seIndexes: [6, 17] },
    // { text: 'amet consectetur', seIndexes: [23, 39] },
  ]);
  const [updatedText, setUpdatedText] = useState(text);
  const [status, setStatus] = useState(false);
  // const textWithoutTags = updatedText.replace(/<\/?[^>]+(>|$)/g, '');

  const selectText = () => {
    const sel = window?.getSelection() as Selection;
    const selStart = sel?.anchorOffset as number;
    const selEnd = sel?.focusOffset as number;

    if (sel.toString() !== '') {
      // console.log(sel.toString());
      if (selEnd > selStart) {
        setSelectedText({ text: sel.toString(), seIndexes: [selStart, selEnd] });
      } else if (selStart > selEnd) {
        setSelectedText({ text: sel.toString(), seIndexes: [selEnd, selStart] });
      }
    }
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
    console.log({ overlapCheckBoldText: boldText });
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
      // console.log({ boldText });

      // replaceWithBoldText(boldText);
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
    console.log({ unsortedBoldText: boldText });
    console.log({ sortedBoldText });

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
      console.log({ newText });
    }
    // setUpdatedText(newText);
  };
  //
  // console.log({ selectedText });
  // console.log({ boldText });
  // console.log(boldText.sort((a,b)=> a.seIndexes[0] - b.seIndexes[0]));

  // console.log(/<\/?[^>]+(>|$)/g.test('sdfsdfsd <b>dsdfsdf</b> sdfsdfsd'));

  return (
    <>
      <button
        className='flex items-center justify-center w-8 h-8 font-bold text-white bg-blue-500 rounded-md'
        onClick={createBoldText}
      >
        B
      </button>
      <button
        className='flex items-center justify-center h-8 px-5 font-bold text-white bg-blue-500 rounded-md'
        onClick={() => replaceWithBoldText(boldText)}
      >
        Start
      </button>
      {/* <div onMouseUp={selectText}>{updatedText}</div> */}
      <div onMouseUp={selectText} dangerouslySetInnerHTML={{ __html: updatedText }}></div>
      <div>
        {boldText.map((el, i) => (
          <div key={i}>{el.text}</div>
        ))}
      </div>
    </>
  );
}
