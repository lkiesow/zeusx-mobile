console.info('UOSZEUSX ⋄ mobile');
uosMobileRetries = 20;

let injectCode = (event) => {
  let status = 'unknown';
  if (document.querySelector('img[title="Absent"]') || document.querySelector('img[title="Abwesend"]')) {
    status = 'absent';
  } else if (document.querySelector('img[title="Present"]') || document.querySelector('img[title="Anwesend"]')) {
    status = 'present';
  }

  if (status === 'unknown' && uosMobileRetries > 0) {
    // Check if we are on the internal login page
    if (document.getElementById('uiLogOn_CD') || document.getElementById('logon-background') || document.getElementById('logon-form')) {
      window.location.href = 'https://zeusx.uni-osnabrueck.de';
    }

    // Retry in a second
    uosMobileRetries--;
    console.warn('Status still unknown. Retries remaining:', uosMobileRetries);
    window.setTimeout(injectCode, 1000);
    return;
  }

  console.info('Status', status);

  // Get today's netto work time
  let accountInfo = document.querySelectorAll('div.account-info-result div.account-list-element-value');
  let workTime = accountInfo[0]?.innerText?.replaceAll(/[^0-9.,]/g, '_');
  let sumTime = accountInfo[1]?.innerText?.replaceAll(/[^0-9.,]/g, '_');
  let sumTimeYesterday = accountInfo[2]?.innerText?.replaceAll(/[^0-9.,]/g, '_');
  let vacation = accountInfo[3]?.innerText?.replaceAll(/[^0-9.,]/g, '_');
  let vacationUnplanned = accountInfo[4]?.innerText?.replaceAll(/[^0-9.,]/g, '_');
  console.info('workTime', workTime);

  // Get time toLocaleLowerCase();
  // document.getElementById('uiBookingOverviewGridContainer')

  let punchBtn = document.getElementById('TerminalButton0');
  console.info('punchBtn', punchBtn);
  let lastAction = document.getElementById('TerminalResult')?.querySelector('div[class="term-result-text"]')?.innerText;
  console.info('lastAction', lastAction);

  if (!document.getElementById('uos-mobile-style')) {
    let head = document.getElementsByTagName('head')[0];

    let style = document.createElement('style')
    style.id = 'uos-mobile-style';
    head.appendChild(style)
    style.innerHTML = `
      @media only screen and (max-width: 800px) {
        #wrapper {
          display: none;
        }
        #uos-mobile-wrapper {
          diyplay: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 16px;
        }
        #uos-mobile-wrapper > div {
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          font-weight: bold;
        }
        #uos-mobile-status {
          height: 40vh;
          font-size: 42px;
          color: white;
        }
        #uos-mobile-status.absent {
          background-color: gray;
        }
        #uos-mobile-status.present {
          background-color: green;
        }
        #uos-mobile-status.unknown {
          background-color: red;
        }
        #uos-mobile-actions {
          height: 50vh;
        }
        #uos-mobile-actions button {
          width: 160px;
          height: 160px;
          border-radius: 80px;
          color: white;
          border: 10px solid silver;
        }
        #uos-mobile-actions button.absent {
          background: gray;
        }
        #uos-mobile-actions button.present {
          background: green;
        }
        #uos-mobile-actions button.unknown {
          display: none;
        }
        #uos-mobile-account-info {
          padding-top: 15px;
        }
        #uos-mobile-account-info > span {
          border: 1px solid black;
          width: 18px;
          height: 18px;
          border-radius: 9px;
          text-align: center;
        }
        #uos-mobile-close-button {
          position: absolute;
          top: 0;
          right: 0;
          width: 50px;
          height: 50px;
          background: transparent;
          border: 0;
          font-size: 42px;
          color: white;
        }
      }
      @media (min-width: 800px) {
        #uos-mobile-wrapper {
          display: none;
        }
      }`;

    let script = document.createElement('script');
    script.id = 'uos-mobile-script';
    script.setAttribute('type', 'application/javascript');
    head.appendChild(script)
    script.innerHTML = `
      function uosPunch() {
        let punchBtn = document.getElementById('TerminalButton0');
        punchBtn.click();
        document.getElementById('uos-mobile-actions').innerText = 'Reloading in 3 seconds…';
        window.setTimeout(uosReload, 3000);
      }
      function uosClose() {
        document.getElementById('uos-mobile-wrapper').style.display = 'none';
        document.getElementById('wrapper').style.display = 'block';
      }
      function uosAccountOverview() {
        alert(
            '${workTime}\\tNetto work time today\\n'
          + '${sumTime}\\tOverall time balance\\n'
          + '${sumTimeYesterday}\\tTime balance yesterday\\n'
          + '${vacation}\\tVacation\\n'
          + '${vacationUnplanned}\\tUnplanned vacation'
        );
      }
      function uosReload() {
        window.location.href = 'https://zeusx.uni-osnabrueck.de';
      }
      // Keepalive every 60 seconds
      window.setInterval(() => {
        console.debug('keepalive');
        _Workspace.MasterCallback('KeepAlive');
      }, 60000);
      `;

    let meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=device-width, initial-scale=1');
    head.appendChild(meta);

    let punch = status === 'absent' ? 'in' : 'out';
    let mobile = document.createElement('div');
    mobile.id = 'uos-mobile-wrapper';
    mobile.innerHTML = `
        <div id='uos-mobile-status' class="${status}">${status}</div>
        <div id='uos-mobile-actions'>
          <button class="${status}" onClick="uosPunch()">punch<br />${punch}</button>
        </div>
        <div id='uos-mobile-work-time'>
          Netto work time today: ${workTime} h
        </div>
        <div id='uos-mobile-account-info' onClick="uosAccountOverview()">
          <span>i</span>
        </div>
        <button onClick="uosClose()" id='uos-mobile-close-button'>×</button>
      `;
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(mobile);
  }

  /*
  let head = document.getElementsByTagName('head')[0].innerHTML;
  document.getElementsByTagName('head')[0].innerHTML = head + `<style>
    @media only screen and (max-width: 800px) {
      #wrapper {
        display: none;
      }
    }
  </style>
  <meta name=viewport content="width=device-width, initial-scale=1">`;
  */
};

//window.addEventListener('load', injectCode);
//window.setTimeout(injectCode, 250);
window.setTimeout(injectCode, 100);
