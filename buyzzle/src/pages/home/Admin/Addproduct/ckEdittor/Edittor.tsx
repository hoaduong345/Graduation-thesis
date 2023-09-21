import { useId, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { FormValues } from '../Addproducts';
type Props = {
  desc: string
};

const Edittor = (props: Props) => {

  const editorRef = useRef<any>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey="i6krl4na00k3s7n08vuwluc3ynywgw9pt6kd46v0dn1knm3i"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={`${props.desc}`}
        init={{
          height: 500,
          menubar: false,   
          plugins: [
            'advlist',
            'autolink',
            'link',
            'image',
            'lists',
            'charmap',
            'preview',
            'anchor',
            'pagebreak',
            'searchreplace',
            'wordcount',
            'visualblocks',
            'visualchars',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'emoticons',
            'template',
            'help',
          ],
          toolbar:
            'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
    </>
  );
};

export default Edittor;