const fs = require('fs')
const { google } = require('googleapis')
const credentials = require('../credentials.json')

const scopes = ['https://www.googleapis.com/auth/drive']
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes
)

const drive = google.drive({ version: 'v3', auth })

var fileMetadata = {
  name: 't.jpg',
}
var media = {
  mimeType: 'image/jpeg',
  body: fs.createReadStream('./t.jpg'),
}
// drive.files.create(
//   {
//     resource: fileMetadata,
//     media: media,
//     fields: 'id',
//   },
//   function (err, file) {
//     if (err) {
//       // Handle error
//       console.error(err)
//     } else {
//       console.log('File Id: ', file.id)
//     }
//   }
// )

var permission = {
  type: 'user',
  role: 'writer',
  emailAddress: 'wvaval@theoasisfirm.com',
}

function share(fileId) {
  drive.permissions.create(
    {
      resource: permission,
      fileId: fileId,
      fields: 'id',
    },
    function (err, res) {
      if (err) {
        // Handle error...
        console.error(err)
      } else {
        console.log('Permission ID: ', res.id)
      }
    }
  )
}
drive.files.list(
  {
    pageSize: 1,
    fields: '*',
  },
  (err, res) => {
    if (err) throw err
    const { files } = res.data

    if (files.length) {
      files.map(async (file) => {
        //share(file.id)
        const { owners, permissions, permissionIds } = file
        console.log({ owners, permissions, permissionIds })
      })
    } else console.log('No files found')
  }
)
function logged(err) {
  if (err) {
    // Handle error
    console.error(err)
  } else {
    // All permissions inserted
  }
}

async function transferOwnership(file, folder, email) {
  await drive.permissions.create({
    fileId: file.id,
    transferOwnership: 'true',
    resource: {
      role: 'owner',
      type: 'user',
      emailAddress: email,
    },
  })
}

async function download(id) {
  var fileId = id
  var dest = fs.createWriteStream('/dest/photo.jpg')
  drive.files
    .get({
      fileId: fileId,
      alt: 'media',
    })
    .on('end', function () {
      console.log('Done')
    })
    .on('error', function (err) {
      console.log('Error during download', err)
    })
    .pipe(dest)
}
// )(async function () {
//   let res = await drive.files.list({
//     pageSize: 20,
//     fields: 'files(name,fullFileExtension,webViewLink)',
//     orderBy: 'createdTime desc',
//   })

//   // Create a new spreadsheet
//   let newSheet = await sheets.spreadsheets.create({
//     resource: {
//       properties: {
//         title: 'Another Day, Another Spreadsheet',
//       },
//     },
//   })

//   // Move the spreadsheet
//   const updatedSheet = await drive.files.update({
//     fileId: newSheet.data.spreadsheetId,
//     // Add your own file ID:
//     addParents: '1Kyd0SwMUuDaIhs03XtKG849-d6Ku_hRE',
//     fields: 'id, parents',
//   })

//   // Transfer ownership
//   await drive.permissions.create({
//     fileId: newSheet.data.spreadsheetId,
//     transferOwnership: 'true',
//     resource: {
//       role: 'owner',
//       type: 'user',
//       // Add your own email address:
//       emailAddress: 'wvaval@theoasisfirm.com',
//     },
//   })

//   // Add data as new rows
//   let sheetData = [['File Name', 'URL']]

//   res.data.files.map((entry) => {
//     const { name, webViewLink } = entry
//     sheetData.push([name, webViewLink])
//   })

//   sheets.spreadsheets.values.append({
//     spreadsheetId: newSheet.data.spreadsheetId,
//     valueInputOption: 'USER_ENTERED',
//     range: 'A1',
//     resource: {
//       range: 'A1',
//       majorDimension: 'ROWS',
//       values: sheetData,
//     },
//   })

//   // Add styling to the first row
//   await sheets.spreadsheets.batchUpdate({
//     spreadsheetId: newSheet.data.spreadsheetId,
//     resource: {
//       requests: [
//         {
//           repeatCell: {
//             range: {
//               startRowIndex: 0,
//               endRowIndex: 1,
//             },
//             cell: {
//               userEnteredFormat: {
//                 backgroundColor: {
//                   red: 0.2,
//                   green: 0.2,
//                   blue: 0.2,
//                 },
//                 textFormat: {
//                   foregroundColor: {
//                     red: 1,
//                     green: 1,
//                     blue: 1,
//                   },
//                   bold: true,
//                 },
//               },
//             },
//             fields: 'userEnteredFormat(backgroundColor,textFormat)',
//           },
//         },
//       ],
//     },
//   })

//   // Back-up data locally
//   let data = 'Name,URL\n'

//   res.data.files.map((entry) => {
//     const { name, webViewLink } = entry
//     data += `${name},${webViewLink}\n`
//   })

//   fs.writeFile('data.csv', data, (err) => {
//     if (err) throw err
//   })
// })()

// async function createNewSheet() {
//   const newSheet = await sheets.spreadsheets.create({
//     resource: {
//       properties: {
//         title: 'A new day, a new sheet',
//       },
//     },
//   })

//   return newSheet
// }

// // const id = '1RcmBYzN-z5B7oXhJQiCVtat34bnn6Kcc'
// // // const updatedSheet = await drive.files.update({
// // //   fileId: newSheet.data.spreadsheetId,
// // //   addParents: directory,
// // //   fields: 'id, parents',
// // // })

// // // const trenf = async () => {
// // //   await drive.permissions.create({
// // //     fileId: newSheet.data.spreadsheetId,
// // //     transferOwnership: 'true',
// // //     resource: {
// // //       role: 'owner',
// // //       type: 'user',
// // //       emailAddress: 'youremail@gmail.com',
// // //     },
// // //   })
// // // }
