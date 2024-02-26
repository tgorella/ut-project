import OrderStatus from "../models/OrderStatus.js";
import orderStatusMock from "../mock/OrderStatusMock.json" assert { type: "json" };

export default async () => {
  const ordersStatuses = await OrderStatus.find();

  if (ordersStatuses.length === 0) {
    await createInitialEntity(OrderStatus, orderStatusMock);
  } else {
    orderStatusMock.map((status) => {
      if (
        ordersStatuses.filter((item) => {
          return item.name === status.name;
        }).length === 0
      ) {
        restoreDefaultData(OrderStatus, status);
      }
    });
  };
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();

  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}

async function restoreDefaultData(Model, data) {
  try {
    delete data._id;
    const newItem = new Model(data);
    await newItem.save();
    return newItem;
  } catch (error) {
    return error;
  }
}
