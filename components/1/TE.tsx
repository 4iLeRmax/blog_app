// 'use client';
// import React, { useEffect, useRef, useState } from 'react';

// const TE = () => {
//   // const [state, setState] = useState('test bold text');
//   const [state, setState] = useState('test <b>bold</b> text <b>bold</b>');
//   const contentRef = useRef(null) as any;
//   const caretPos = useRef(null) as any;

//   useEffect(() => {
//     if (caretPos.current !== null) {
//       setCaret(contentRef.current, caretPos.current);
//       contentRef.current.focus();
//     }
//   }, [state]);

//   function getCaret(el) {
//     let caretAt = 0;
//     const sel = window.getSelection();

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

//   function setCaret(el, pos) {
//     console.log(el);
//     console.log(pos);

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

//   return (
//     <>
//       <div
//         className='p-2 bg-white'
//         ref={contentRef}
//         suppressContentEditableWarning={true}
//         contentEditable={true}
//         onInput={(e) => {
//           caretPos.current = getCaret(contentRef.current);
//           setState(e.target.innerHTML);
//         }}
//         dangerouslySetInnerHTML={{ __html: state }}
//       ></div>
//     </>
//   );
// };
// export default TE;
'use client';

import React, { useCallback, useRef, useState } from 'react';

const TE = () => {
  const [selectedText, setSelectedText] = useState({});
  const divRef = useRef(null);

  const selectText = useCallback(() => {
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

    console.log({ text: selection.toString() }, selStart, selEnd);
    setSelectedText({ text: selection.toString(), seIndexes: [selStart, selEnd] });
  }, [divRef]);

  return (
    <>
      <TextField divRef={divRef} selectText={selectText} />
    </>
  );
};

export default TE;

type TextFieldProps = {
  divRef: React.MutableRefObject<null>;
  selectText: () => void;
};

const TextField = React.memo(({ divRef, selectText }: TextFieldProps) => {
  console.log('update');

  return (
    <>
      <div
        contentEditable
        ref={divRef}
        key={'textField'}
        onMouseUp={selectText}
        dangerouslySetInnerHTML={{
          __html: '<u>Lorem</u> <b>ips<i>um</b> sit <u>amet</i> consectetur</u> <i>bla</i>',
        }}
      ></div>
    </>
  );
});
