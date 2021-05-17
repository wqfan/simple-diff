import CodeMirror from 'codemirror';
import * as Diff from 'diff';
import * as Diff2Html from 'diff2html/lib/ui/js/diff2html-ui';

import 'codemirror/lib/codemirror.css';
import 'diff2html/bundles/css/diff2html.min.css';
import './index.css';

const [lEditor, rEditor] = ['text1', 'text2']
  .map(id => document.getElementById(id))
  .map(e => CodeMirror(e!, {lineNumbers: true}));
const diffContainer = document.getElementById('diff')!; 

document.getElementById('compare')!.addEventListener('click', () => {
  new Diff2Html.Diff2HtmlUI(diffContainer,
    Diff.createPatch('diff', lEditor.getValue(), rEditor.getValue()), 
    {
      drawFileList: false,
      fileContentToggle: false,
      outputFormat: 'side-by-side',
    },
  )
    .draw();
});
