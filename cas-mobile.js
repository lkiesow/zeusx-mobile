console.info('UOSCAS ⋄ mobile');

let injectCode = (event) => {
  let style = document.getElementById('uos-mobile-style');
  if (!style) {
    let head = document.getElementsByTagName('head')[0];

    style = document.createElement('style')
    style.id = 'uos-mobile-style';
    head.appendChild(style)
  }

  style.innerHTML = `
    @media only screen and (max-width: 800px) {
      #login_page {
        width: 100% !important;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
      }
      form {
        display: inline-block;
        text-align: left;
        font-size: larger;
      }
      form > p:first-of-type {
        display: none;
      }
      #username, #password {
        min-width: 220px;
      }
      .login_text {
        text-align: center;
      }
      #login_header {
        background-color: #ac1035;
        text-align: center;
        margin: 0 !important;
        padding: 50px 0;
      }
      #login_header > img, #login_header > div {
        display: none;
      }
    }`;

  document.getElementsByClassName('login_block')[0].classList = ['login_text'];

  let support_url = 'https://www.uni-osnabrueck.de/it-services/it-support-an-der-universitaet-osnabrueck';
  let footer = document.getElementsByClassName('login_block')[0];
  footer.id = 'uos-mobile_footer';
  footer.innerHTML = `<a href=${support_url}>IT-Support</a>`;
};

//window.addEventListener('load', injectCode);
//window.setTimeout(injectCode, 250);
window.setTimeout(injectCode, 100);
