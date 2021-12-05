const mailerContent = (
  companyName: string,
  positionName: string,
  url: string
) => {
  return `<!doctype html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
    <head>
      <title>
      </title>
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
        #outlook a {
          padding: 0;
        }
  
        body {
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
  
        table,
        td {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
  
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }
  
        p {
          display: block;
          margin: 13px 0;
        }
      </style>
      <!--[if mso]>
          <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
      <!--[if lte mso 11]>
          <style type="text/css">
            .mj-outlook-group-fix { width:100% !important; }
          </style>
          <![endif]-->
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Montserrat:normal,italic,bold&display=swap" rel="stylesheet" type="text/css">
      <link href="https://fonts.googleapis.com/css?family=Prompt:normal,italic,bold&display=swap" rel="stylesheet" type="text/css">
      <link href="https://fonts.googleapis.com/css?family=Comfortaa:normal,italic,bold&display=swap" rel="stylesheet" type="text/css">
      <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Montserrat:normal,italic,bold&display=swap);
        @import url(https://fonts.googleapis.com/css?family=Prompt:normal,italic,bold&display=swap);
        @import url(https://fonts.googleapis.com/css?family=Comfortaa:normal,italic,bold&display=swap);
      </style>
      <!--<![endif]-->
      <style type="text/css">
        @media only screen and (min-width:480px) {
          .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%;
          }
        }
      </style>
      <style media="screen and (min-width:480px)">
        .moz-text-html .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
      </style>
      <style type="text/css">
        @media only screen and (max-width:480px) {
          table.mj-full-width-mobile {
            width: 100% !important;
          }
  
          td.mj-full-width-mobile {
            width: auto !important;
          }
        }
      </style>
      <style type="text/css">
        .vdt_styles {}
  
        a {}
      </style>
    </head>
  
    <body style="word-spacing:normal;background-color:#ffffff;">
      <div style="background-color:#ffffff;">
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#F1FAEE;background-color:#F1FAEE;margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#F1FAEE;background-color:#F1FAEE;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:20px;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:560px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                      <tbody>
                        <tr>
                          <td style="vertical-align:top;padding:0;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px;word-break:break-word;">
                                    <div style="font-family:'Comfortaa', 'Helvetica', 'Arial', sans-serif;font-size:20px;line-height:1;text-align:center;color:#1d3557;"><strong>Eligo</strong></div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#A8DADC;background-color:#A8DADC;margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#A8DADC;background-color:#A8DADC;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:20px;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:560px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                      <tbody>
                        <tr>
                          <td style="vertical-align:top;padding:0;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                              <tbody>
                                <tr>
                                  <td style="font-size:0px;word-break:break-word;">
                                    <div style="height:50px;line-height:50px;">&#8202;</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px;padding-top:10px;padding-right:30px;padding-bottom:10px;padding-left:30px;word-break:break-word;">
                                    <div style="font-family:'Prompt', 'Helvetica', 'Arial', sans-serif;font-size:48px;line-height:1.25;text-align:center;color:#1d3557;"><strong>Interview invitation&nbsp;&nbsp;</strong></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px;padding-top:10px;padding-right:50px;padding-bottom:10px;padding-left:50px;word-break:break-word;">
                                    <div style="font-family:'Montserrat', 'Helvetica', 'Arial', sans-serif;font-size:20px;line-height:1.5;text-align:center;color:#1d3557;">You have been invited by ${companyName} to take interview for:</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;" class="mj-full-width-mobile">
                                      <tbody>
                                        <tr>
                                          <td style="width:560px;" class="mj-full-width-mobile">
                                            <img height="auto" src="https://getvero.s3.amazonaws.com/uploads%2F6f361cb8c6e0b33c89cae59a1d3f944a%2Ffullsize%2Fec4756d6-cde2-4d2b-bcef-62951c08f7e4-hand-drawn.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="560" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px;padding-top:10px;padding-right:30px;padding-bottom:10px;padding-left:30px;word-break:break-word;">
                                    <div style="font-family:'Prompt', 'Helvetica', 'Arial', sans-serif;font-size:32px;line-height:1.25;text-align:center;color:#1d3557;"><strong>${positionName}</strong></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px;padding-top:10px;padding-right:50px;padding-bottom:10px;padding-left:50px;word-break:break-word;">
                                    <div style="font-family:'Montserrat', 'Helvetica', 'Arial', sans-serif;font-size:20px;line-height:1.5;text-align:center;color:#1d3557;">Think link will expire in 7 days.</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="font-size:0px;word-break:break-word;">
                                    <div style="height:30px;line-height:30px;">&#8202;</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" vertical-align="middle" style="font-size:0px;padding:0px;word-break:break-word;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                      <tr>
                                        <td align="center" bgcolor="#E63946" role="presentation" style="border:none;border-radius:32px;cursor:auto;mso-padding-alt:10px 25px;background:#E63946;" valign="middle">
                                          <a href=${url} style="display:inline-block;background:#E63946;color:#ffffff;font-family:'Montserrat', 'Helvetica', 'Arial', sans-serif;font-size:20px;font-weight:normal;line-height:1.5;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:32px;" target="_blank">
                                            <strong>Take interview</strong>
                                          </a>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="font-size:0px;word-break:break-word;">
                                    <div style="height:50px;line-height:50px;">&#8202;</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
      </div>
    </body>
  
  </html>`;
};

export default mailerContent;
