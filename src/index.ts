import db from './db';

const TABLE_NAME_USER = 'users'

type DataUser = {
  name: string,
  email: string
}

// Ví dụ: Tạo một bảng và chèn dữ liệu
async function createTable() {
  try {
    await db.schema.createTable(TABLE_NAME_USER, table => {
      table.increments('id');
      table.string('name');
      table.string('email');
    });
    console.log('Table created successfully');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    db.destroy(); // Đóng kết nối với cơ sở dữ liệu
  }
}

const insertData = async (data: DataUser[]) => {
  try {
    const existingUsers: DataUser[] = await db('users').whereIn('name', data.map(user => user.name));
    const existingUsersName = existingUsers.map(user => user.name);
    const dataUpdate = data.filter(o => !existingUsersName.includes(o.name))
    if (dataUpdate.length > 0) {
      await db(TABLE_NAME_USER).insert(dataUpdate);
      console.log('data inserted successfully.');
    } else {
      console.log("all data already")
    }

  } catch (error) {
    console.error("error: ", error);
  } finally {
    db.destroy(); // close connect db
  }
}

// Hàm lấy ra tất cả dữ liệu trong bảng
async function getAllData() {
  try {
    const allData = await db.select("*").from(TABLE_NAME_USER)
    console.log('All data:', allData);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    db.destroy(); // Đóng kết nối với cơ sở dữ liệu
  }
}

const updateData = async (dataUpdate: { name: string } & Partial<Pick<DataUser, "email">>, upsert?: boolean) => {
  try {
    const data = await db(TABLE_NAME_USER).where({ name: dataUpdate.name }).first().update(dataUpdate).returning("*")

    if (!!data.length) {
      console.log("update success ", data[0]);
    } else {
      if (upsert) {
        await db(TABLE_NAME_USER).insert(dataUpdate);
        console.log('data inserted successfully. ', dataUpdate);
      } else {
        console.log("not exist data");
      }
    }
  } catch (err) {
    console.error(err);

  } finally {
    db.destroy();
  }
}

const deleteDate = async (props: Partial<DataUser>) => {
  try {
    const data = await db(TABLE_NAME_USER).where(props).delete()
    if(data === 1) { 
      console.log('delete successfully');
    } else {
      console.log('data not exist');
      
    }
  } catch (error) {
    console.log(error);
  } finally { 
    db.destroy();
  }

}

const main = async () => {
  // // create table
  // createTable();
  // // read
  // getAllData()
  // // create
  // insertData([
  //   {
  //     name: "hung2", 
  //     email: "duyhungfa1022@gmail.com"
  //   }, 
  //   { 
  //     name: "duy", 
  //     email: 'duypv@gmail.com'
  //   }
  // ])

  // // update
  // //  update or create 
  // updateData({
  //   name: "hung4", 
  //   email: "duyhungfa4@gmail.com"
  // }, true)
  // // delete
  // deleteDate({
  //   name: "hung3"
  // })
}

main();