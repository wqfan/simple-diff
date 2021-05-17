import CodeMirror from 'codemirror';
import * as Diff from 'diff';
import * as Diff2Html from 'diff2html/lib/ui/js/diff2html-ui';

import 'codemirror/lib/codemirror.css';
import 'diff2html/bundles/css/diff2html.min.css';
import './index.css';

const [
  elemTextL,
  elemTextR,
  elemCompare,
  elemInline,
  elemDiff,
] = [
  'text1', 
  'text2',
  'compare',
  'inline',
  'diff',
].map(id => document.getElementById(id)!);

const [lEditor, rEditor] = [elemTextL, elemTextR]
  .map(e => CodeMirror(e, {lineNumbers: true}));

let [lText, rText] = ['', ''];

const updateText = () => {
  lText = lEditor.getValue();
  rText = rEditor.getValue();
};

const render = () => {
  new Diff2Html.Diff2HtmlUI(elemDiff,
    Diff.createPatch('diff', lText, rText),
    {
      drawFileList: false,
      fileContentToggle: false,
      outputFormat: (<HTMLInputElement>elemInline).checked ? 'line-by-line' : 'side-by-side',
    },
  )
    .draw();
};

elemInline.addEventListener('click', render);
elemCompare.addEventListener('click', () => {
  updateText();
  render();
});

render();
