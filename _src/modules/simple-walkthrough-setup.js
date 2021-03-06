import { factory } from 'repl';
import { cons } from 'dom-console';
import loader from 'loader';

cons.install('#console');

let evaluator;
export let install = test => evaluator = factory(test);
let assetLocation = document.body.getAttribute('data-asset-location');

let forms = Array.from(document.querySelectorAll('form.unsubmitable'));
for (let form of forms) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
  });
}

let editor = ace.edit('editor');
editor.setTheme('ace/theme/twilight');
editor.getSession().setTabSize(2);
editor.getSession().setMode('ace/mode/javascript');
editor.container.getElementsByTagName('textarea')[0].addEventListener('keydown', e => {
  if (e.which === 69 && (e.metaKey || e.ctrlKey)) {
    handlers.evaluate(e);
  } else if (e.which === 27) {
    handlers.clear(e);
  }
});

let handlers = {
  clear(e) {
    e.preventDefault();
    cons.clear();
  },

  evaluate(e) {
    e.preventDefault();
    evaluator(editor.getValue(), e => {
      if(e) {
        cons.error(e);
      }
    });
  },

  feedback(e) {
    let feedbackPanel = document.getElementById('feedback-panel');
    if (feedbackPanel.classList.contains('show')) {
      feedbackPanel.classList.remove('show');
    } else {
      feedbackPanel.classList.add('show');
    }
  },

  resize() {
    let height = window.innerHeight - 2 * document.querySelector('form.unsubmitable').offsetHeight - 10;
    document.getElementById('console').style.height = height + 'px';
    editor.container.style.height = height + 20 + 'px';
    editor.resize();
  }
};

window.addEventListener('resize', handlers.resize);
handlers.resize();

Mousetrap.bind([ 'ctrl+e', 'command+e' ], handlers.evaluate);
Mousetrap.bind('esc', handlers.clear);

document
  .getElementById('clear-console')
  .addEventListener('click', handlers.clear);

document
  .getElementById('feedback')
  .addEventListener('click', handlers.feedback);

let run = document.getElementById('evaluate');
run.addEventListener('click', handlers.evaluate);

if (window.navigator.platform.indexOf('Mac') < 0) {
  run.innerHTML = '<span class="fa fa-play"></span> Evaluate (Ctrl+S)';
}

let test = () => document.getElementById('editor').className.contains('ace-twilight');
let cb = () => handlers.resize();
loader('workspace', 'loader', test, cb);
