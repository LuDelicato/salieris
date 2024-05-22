document.addEventListener("DOMContentLoaded", function () {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      const menuList = document.getElementById("menu-list");
      const orderList = document.getElementById("order-list");
      const totalElement = document.getElementById("total");
      const clearAllButton = document.getElementById("clear-all");
      let total = 0;
      const orderItems = {};

      data.menu.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;
        const addButton = document.createElement("button");
        addButton.textContent = "+";
        addButton.addEventListener("click", () => {
          if (!orderItems[item.name]) {
            orderItems[item.name] = {
              ...item,
              quantity: 0,
              element: document.createElement("li"),
            };
            const orderItem = orderItems[item.name];
            orderItem.element.classList.add("order-item");
            orderItem.element.textContent = `${orderItem.name} - $${orderItem.price} x ${orderItem.quantity}`;
            const removeButton = document.createElement("button");
            removeButton.textContent = "-";
            removeButton.addEventListener("click", () => {
              if (orderItem.quantity > 0) {
                orderItem.quantity--;
                total -= orderItem.price;
                totalElement.textContent = total;
                if (orderItem.quantity === 0) {
                  orderList.removeChild(orderItem.element);
                  delete orderItems[item.name];
                } else {
                  orderItem.element.firstChild.textContent = `${orderItem.name} - $${orderItem.price} x ${orderItem.quantity}`;
                }
              }
            });
            orderItem.element.appendChild(removeButton);
            orderList.appendChild(orderItem.element);
          }
          orderItems[item.name].quantity++;
          total += item.price;
          totalElement.textContent = total;
          orderItems[item.name].element.firstChild.textContent = `${
            item.name
          } - $${item.price} x ${orderItems[item.name].quantity}`;
        });
        li.appendChild(addButton);
        menuList.appendChild(li);
      });

      clearAllButton.addEventListener("click", () => {
        orderList.innerHTML = "";
        total = 0;
        totalElement.textContent = total;
        for (let item in orderItems) {
          delete orderItems[item];
        }
      });
    });
});
