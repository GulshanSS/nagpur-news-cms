import { URLSearchParams } from "url";
import config from "../config";

const FACEBOOK_POST_URL = `${config.FACEBOOK_POST_BASE_URL}/${config.FACEBOOK_PAGE_ID}`;

// const creds = {
//   data: [
//     {
//       access_token:
//         "EAAJpzpE6vWQBOx1mb6uhz5qxgscUo3XGLjHKO2s0g1AEJVU9FGiQIcuFtUDoo8TWSeox6K92wjBargXYPf00lZBRiw4vJEszXNCIbutM5ZBYY7cJXmvwB5Fkgr1FoCqDTDqIPfuhRoSVtBToQ2B7DnlaI7A2LYkmr8b1o4ZBQAubQsaPwJ3bwx0cupwFMkZD",
//       category: "News & media website",
//       category_list: [{ id: "2709", name: "News & media website" }],
//       name: "Nagpur News",
//       id: "101997571938159",
//       tasks: [
//         "ADVERTISE",
//         "ANALYZE",
//         "CREATE_CONTENT",
//         "MESSAGING",
//         "MODERATE",
//         "MANAGE",
//       ],
//     },
//   ],
//   paging: {
//     cursors: {
//       before:
//         "QVFIUnlrSFItQ0ZA4MmJGZA0I0eEplNnlHVXJyNlNDd1hMbXpIdUZAkQlpzV0hXb3laa2VEZAU9ZAMzBoQ1V5N2FldzRBSy15ZADNLQWVJNXpWVHEwWFB0WngyWnJ3",
//       after:
//         "QVFIUnlrSFItQ0ZA4MmJGZA0I0eEplNnlHVXJyNlNDd1hMbXpIdUZAkQlpzV0hXb3laa2VEZAU9ZAMzBoQ1V5N2FldzRBSy15ZADNLQWVJNXpWVHEwWFB0WngyWnJ3",
//     },
//   },
// };

const queryParameter = new URLSearchParams({
  access_token: config.FACEBOOK_PAGE_ACCESS_TOKEN,
});

export const postToFacebookPage = async (
  file: Express.Multer.File,
  link: string,
  message: string
) => {
  const formData = new FormData();
  const blob = new Blob([file.buffer], { type: file.mimetype });
  formData.append("message", `${message} - ${link}`);
  formData.append("file", blob, file.filename);

  const photoResponse = await fetch(
    `${FACEBOOK_POST_URL}/photos?${queryParameter.toString()}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const photoData = await photoResponse.json();

  console.log(photoData);
};
