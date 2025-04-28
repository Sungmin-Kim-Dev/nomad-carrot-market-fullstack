import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// async function test() {
//   const user = await db.user.create({
//     data: {
//       username: "test",
//       phone: "123123",
//     },
//   });
//   console.log(user);
// }

// test();
// async function test() {
//   const token = await db.sMSToken.create({
//     data: {
//       token: "1212212",
//       user: {
//         connect: {
//           id: 2,
//         },
//       },
//     },
//   });

//   console.log(token);
// }

// test();

export default db;
