(function() {
  'use strict';
  const regExp = /orbisApp.buildForm\((.+?), '', ''\)\.submit\(\);/;
  let rowArray = [];

  function setRowArray() {
    const postingTableRows = document.querySelectorAll('#postingsTable>tbody>tr');
    rowArray = postingTableRows.length ? Array.from(postingTableRows) : [];
  }

  document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('postingsTablePlaceholder');
    setRowArray();
    injectHideShortlisted();
    injectLinks();
    const observer = new MutationObserver(() => {
      setRowArray();
      injectLinks();
      toggleRows();
    });
    observer.observe(wrapper, { childList: true });
    change(location.hash.split('#/?code=')[1]);
  });

  let hidden = false;
  function toggleRows() {
    let i = rowArray.length;
    if (hidden) {
      while (i-- > 0) {
        const row = rowArray[i];
        if (row.querySelector('td:nth-child(1) > a.favourite.action.btn.btn-small.buttonWidth').innerText === 'Unshortlist') {
          row.style.display = 'none';
        }
      }
    } else {
      while (i-- > 0) {
        const row = rowArray[i];
        if (row.style.display === 'none') {
          row.style.display = null;
        }
      }
    }
  }

  function injectHideShortlisted() {
    const target = document.getElementById('hideSideNav').parentElement;
    const label = document.createElement('label');
    label.onchange = () => {
      hidden = !hidden;
      toggleRows();
    };
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode('Hide Shortlisted'));
    target.appendChild(label);
  }

  function injectLinks() {
    let i = rowArray.length;
    while (i-- > 0) {
      const row = rowArray[i];
      const tds = row.getElementsByTagName('td');
      const td1 = tds[1];
      const td = tds[3];
      const as = td.getElementsByTagName('a');
      const a = as[as.length - 1];
      const code = regExp.exec(a.getAttribute('onclick'))[1].replace(/'/g, '"');
      const newA = document.createElement('a');
      newA.className = 'open-in-new-tab';
      newA.href = '#/?code=' + encodeURIComponent(code);
      newA.addEventListener('click', () => {
        a.style.fontWeight = 'normal';
        setTimeout(() => { history.replaceState('', '', '#');}, 0);
        change(code, true);
      });
      a.parentElement.insertBefore(newA, a);
    }
  }

  function change(code, newTab) {
    if (!code) {
      return;
    }
    const decodedCode = JSON.parse(newTab ? code : decodeURIComponent(code));
    history.replaceState('', '', '#');
    window.orbisApp.buildForm(decodedCode, '', newTab ? '_blank' : '').submit();
  }

  const styleString = `.table th,
.table td {
  overflow: auto;
  padding: 0;
  vertical-align: middle;
}
.label,
.btn-small {
  border-radius: 0;
  padding: 0 2px;
  margin: 0;
}
#postingsTable th:nth-child(1),
#postingsTable td:nth-child(1) {
  width: 96px;
  overflow: visible;
}
#postingsTable th:nth-child(2),
#postingsTable td:nth-child(2),
.btn-group {
  display: none;
}
#postingsTable th:nth-child(3),
#postingsTable td:nth-child(3) {
  max-width: 10px;
  width: 10px;
}
#postingsTable th:nth-child(4),
#postingsTable td:nth-child(4) {
  max-width: 200px;
}
#postingsTable th:nth-child(5),
#postingsTable td:nth-child(5) {
  max-width: 100px;
}
#postingsTable th:nth-child(6),
#postingsTable td:nth-child(6) {
  max-width: 65px;
}
#postingsTable th:nth-child(7),
#postingsTable td:nth-child(7),
#postingsTable th:nth-child(11),
#postingsTable td:nth-child(11),
#postingsTable th:nth-child(12),
#postingsTable td:nth-child(12) {
  max-width: 0;
  width: 0;
  text-align: center;
  overflow: hidden;
}
#postingsTable th:nth-child(8),
#postingsTable td:nth-child(8) {
  max-width: 90px;
  width: 90px;
}
#postingsTable th:nth-child(9),
#postingsTable td:nth-child(9) {
  max-width: 67px;
  width: 67px;
}
#postingsTable th:nth-child(10),
#postingsTable td:nth-child(10) {
  max-width: 123px;
  width: 123px;
}
.open-in-new-tab {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"><path fill="#fff" stroke="#06c" d="M1.5 4.518h5.982V10.5H1.5z"/><path d="M5.765 1H11v5.39L9.427 7.937l-1.31-1.31L5.393 9.35l-2.69-2.688 2.81-2.808L4.2 2.544z" fill="#0C4A7B"/><path d="M9.995 2.004l.022 4.885L8.2 5.07 5.32 7.95 4.09 6.723l2.882-2.88-1.85-1.852z" fill="#fff"/></svg>');
  padding-left: 13px;
  background-position: center left;
  background-repeat: no-repeat;
}
.open-in-new-tab:hover {
  border-bottom: 1px solid #46b9f4;
}
#mainContentDiv {
  display: block;
  float: none;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
}
.table,
#mainContentDiv,
.nav-list>li>a,
.nav-list .nav-header {
  margin: 0;
}
.nav-list .sidebar-nav ul.nav-list {
  padding-left: 0 !important;
  vertical-align: middle;
  display: inline-block;
}
.topScrollBox,
#brandingNav,
.nbs--fixed-nav,
.orbisFooter,
#adminNav,
.span2.bs--hide__column:before {
  display: none;
}
.orbis-posting-actions,
.sidebar-nav li {
  margin: 0 !important;
}
.sidebar-nav li .childMenu1.nav.nav-list {
  position: absolute;
  visibility: hidden;
  z-index: 1001;
  top: 100%;
  border: 1px solid #005baa;
  padding: 0 !important;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  background: black;
  left: 50%;
  transform: translateX(-50%);
}
.sidebar-nav li:hover .childMenu1.nav.nav-list {
  visibility: visible;
}
.sidebar-nav li .childMenu1 li {
  display: block;
  border-radius: 0;
}
.nav-collapse,
.nav-collapse.collapse {
  height: unset !important;
  overflow: visible !important;
  background: #FFF;
}
.sidebar-nav .nav-list {
  background: #000;
}
.sidebar-nav li {
  vertical-align: top;
  position: relative;
  display: inline-block;
}
.sidebar-nav li a {
  border-radius: 0 !important;
}
.row-fluid .span2.bs--hide__column {
  display: block;
  float: none;
  max-height: none !important;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  overflow: visible !important;
  background: black;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  margin: 0 !important;
}
.row-fluid .span2.bs--hide__column,
.orbisFooter {
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.3);
}
.container-fluid {
  padding: 0;
}
html body,
body.is--hidden {
  padding: 30px 0 0 0;
}
.modal {
  border: 1px solid white;
}
.modal-footer,
.nav-tabs.nav-stacked,
.modal,
.pagination ul>li>a,
.pagination ul>li>span,
.table-striped tbody>tr:nth-child(odd)>td,
.table-striped tbody>tr:nth-child(odd)>th,
.table,
.panel,
.orbisFooter,
.orbisTabContainer .tab-content {
  background: black;
}
#postingsTable>thead,
#postingsTable th,
#mainContentDiv>div.row-fluid>div>div>div>div.tab-content>div>div>div {
  background: black !important;
}
.pager li>a,
.pager li>span,
.box,
.panel-default > .panel-heading,
.sidebar-nav .nav-list>.active>a,
.sidebar-nav .nav-list>.active>a:hover,
html body,
body.is--hidden {
  background: black;
  color: white;
}
.nav>li>a:hover,
.nav>li>a:focus,
.pager li>a:hover,
.pager li>a:focus,
.sidebar-nav .nav-list>li>a:hover,
.table-hover tbody tr:hover>td {
  background: #333;
}
.close {
  opacity: 1;
}
.close,
.close:hover,
.close:active,
.pagination ul>.disabled>span,
.pagination ul>.disabled>a,
.pagination ul>.disabled>a:hover,
.pagination ul>.disabled>a:focus,
.stat-table .full,
.orbisModuleHeader h1 {
  color: white;
}
a,
a:hover,
a:focus,
.sidebar-nav .nav-list>li>a,
.sidebar-nav .nav-list>li>a:hover {
  color: #46b9f4;
}
a:focus,
button:focus,
input:focus,
textarea:focus,
select:focus,
.btn:focus {
  outline: 1px solid #46b9f4 !important;
}
li.active>div {
  overflow: hidden;
}
#postingsTableDiv {
  overflow-y: hidden;
}`;
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.appendChild(document.createTextNode(styleString));
  const observer = new MutationObserver(() => {
    if (document.head) {
      observer.disconnect();
      document.documentElement.appendChild(style);
    }
  });
  observer.observe(document.documentElement, { childList: true });
})();
