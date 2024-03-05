import React, { useState } from "react";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";

type Props = {};

const Editor = (props: Props) => {
  const [editor] = useState(() => withReact(createEditor()));

  const initialValue: any = [
    {
      type: "paragraph",
      children: [{ text: "this is a base example" }],
    },
  ];

  return (
    <div>
      <Slate editor={editor} initialValue={initialValue}>
        <Editable />
      </Slate>
    </div>
  );
};

export default Editor;
