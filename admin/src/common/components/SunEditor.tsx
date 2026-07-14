'use client';

import { useEffect, useRef } from 'react';
import suneditor, { plugins } from 'suneditor';
import 'suneditor/css/contents';
import 'suneditor/css/editor';

export default function SunEditor({
  blogData,
  setBlogData,
}: {
  blogData: string;
  setBlogData: (value: string) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const setBlogDataRef = useRef<(value: string) => void>(() => {});

  useEffect(() => {
    setBlogDataRef.current = setBlogData;
  }, [setBlogData]);

  useEffect(() => {
    const textareaElement = textareaRef.current;
    if (!textareaElement) {
      return;
    }

    const instance = suneditor.create(textareaElement, {
      plugins,
      value: blogData ?? '',
      events: {
        onChange: (event) => {
          const contents = event.data;
          console.log('[SunEditor] events.onChange', {
            length: contents.length,
            preview: contents.slice(0, 120),
          });
          setBlogDataRef.current(contents);
        },
      },
      toolbar_sticky: 0,
      paragraphStyle: {
        items: ['spaced', 'bordered', 'neon'],
      },
      image: {
        uploadUrl: `${process.env.NEXT_PUBLIC_API_URL}/images/upload`,
        // No need for uploadHeaders - cookies are sent automatically
      },
      backgroundColor: {
        disableHEXInput: true,
      },
      buttonList: [
        ['undo', 'redo', 'save'],
        '|',
        ['blockStyle', 'font', 'fontSize'],
        '|',
        ['bold', 'italic', 'underline', 'strike'],
        '|',
        ['fontColor', 'backgroundColor'],
        '|',
        ['removeFormat'],
        '/',
        ['outdent', 'indent', 'align', 'list'],
        '|',
        ['table', 'link', 'image', 'video'],
        '|',
        [
          'fullScreen',
          'preview',
          'print',
          'finder',
        ],
        ['subscript', 'superscript'],
        ['blockquote', 'paragraphStyle', 'textStyle'],
        ['list_numbered', 'list_bulleted', 'lineHeight'],
        ['hr', 'anchor'],
        ['drawing', 'embed'],
        ['showBlocks']
      ],
    });

    return () => {
      instance.destroy();
    };
  }, [blogData, setBlogData]);

  return (
    <textarea
      className="w-full min-h-[500px] border border-gray-300 rounded-lg p-2"
      ref={textareaRef}
      defaultValue={blogData}
    />
  );
}