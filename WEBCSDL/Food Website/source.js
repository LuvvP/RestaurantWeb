var bookTable 
var statusTable
let isShowToastTableExecuted = false;
let tableName =''

fetch('http://127.0.0.1:5000/api/monan/all')
  .then(response => response.json())
  .then(data => {
    // Xử lý dữ liệu trả về từ API
    // Vòng lặp qua từng phần tử và tạo HTML tương ứng
    data.forEach(item => {
      const menuCard = document.createElement('div');
      menuCard.className = 'menu_card';
    
      const menuImage = document.createElement('div');
      menuImage.className = 'menu_image';
      const image = document.createElement('img');
      image.src = item.hinhanh;
      menuImage.appendChild(image);
      menuCard.appendChild(menuImage);
      // console.log(item.ma_td)
      menuCard.classList.add(item.ma_td);
    
      const smallCard = document.createElement('div');
      smallCard.className = 'small_card';
      const heartIcon = document.createElement('i');
      heartIcon.className = 'fa-solid fa-heart';
      smallCard.appendChild(heartIcon);
      menuCard.appendChild(smallCard);
    
      const menuInfo = document.createElement('div');
      menuInfo.className = 'menu_info';
      
      const titleDescriptionDiv = document.createElement('div'); // Tạo div mới
      
      const title = document.createElement('h2');
      title.textContent = item.ten_mon;
      titleDescriptionDiv.appendChild(title); // Thêm title vào div mới
      
      const description = document.createElement('p');
      description.textContent = item.description;
      titleDescriptionDiv.appendChild(description); // Thêm description vào div mới
      
      menuInfo.appendChild(titleDescriptionDiv); // Thêm div mới vào menuInfo
    
      const price = document.createElement('h3');
      price.textContent = `VND${item.gia.toFixed(2)}`;
      menuInfo.appendChild(price);
      
      const menuIcon = document.createElement('div');
      menuIcon.className = 'menu_icon';
      for (let i = 0; i < 5; i++) {
        const starIcon = document.createElement('i');
        starIcon.className = 'fa-solid fa-star' + (i < item.soluong ? '' : '-half-stroke');
        menuIcon.appendChild(starIcon);
      }
      menuInfo.appendChild(menuIcon);
      
      const orderBtn = document.createElement('a');
      orderBtn.href = '#Order';
      orderBtn.className = 'menu_btn';
      if(item.soluong > 0) {
        orderBtn.textContent = "Active";
      } else {
        orderBtn.textContent = "Not Active";
      }
      menuInfo.appendChild(orderBtn);
    
      menuCard.appendChild(menuInfo);
    
      // Thêm menuCard vào một phần tử HTML tương ứng trong trang của bạn
      document.getElementById('menu-box').appendChild(menuCard);
    });
  })
  .catch(error => {
    console.error('Lỗi khi gọi API:', error);
  });
const menuBox = document.getElementById('menu-box');

menuBox.addEventListener('click', (event) => {
  const target = event.target;

  const elementsWithId = document.getElementsByClassName(target.id);
  for (let i = 0; i < elementsWithId.length; i++) {
    elementsWithId[i].classList.remove('hidden');
  }
//   const allElements = document.getElementsByClassName('menu_card');

//   for (let i = 0; i < allElements.length; i++) {
    //     console.log(allElements)
    //     const element = allElements[i];
    //     if (element.id !== target.id) {
        //       element.classList.remove('hidden');
        //     }
        //   }
        const allElements = document.querySelectorAll('.menu_card:not(.' + CSS.escape(target.id) + ')');
        allElements.forEach((element) => {
            element.classList.add('hidden');
          });

});

const token = localStorage.getItem('token');
const orderBtn = document.getElementById('order-btn');

if (token) {
    console.log(orderBtn)
  // Nếu có token, gọi API để lấy thông tin các bàn khi nhấp vào nút "Order Now"
  orderBtn.addEventListener('click', function() {
    fetch('http://127.0.0.1:5000/api/table/infor-table/all', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Lỗi khi lấy thông tin các bàn');
        }
      })
      .then(data => {
        // Hiển thị danh sách các bàn
        const tableList = document.getElementById('table-list');
        tableList.classList.remove('hidden')
        tableList.innerHTML = ''; // Xóa danh sách bàn hiện tại (nếu có)
        data.forEach(table => {
          const tableElement = document.createElement('div');
          tableElement.classList.add('table-card');
          const tableNameElement = document.createElement('p');
          tableNameElement.textContent = table.ten_ban;

          const capacityElement = document.createElement('p');
          capacityElement.textContent = `Sức chứa: ${table.soghe}`;

          tableElement.appendChild(tableNameElement);
          tableElement.appendChild(capacityElement);

          tableList.appendChild(tableElement);
          if (table.tinhtrang === 'Dang dung bua') {
            tableElement.classList.add('red-color'); //Thêm lớp CSS cho màu đỏ
          } else if (table.tinhtrang === 'Da dat truoc') {
            tableElement.classList.add('yellow-color'); //Thêm lớp CSS cho màu vàng
          }
          const tableCards = document.getElementsByClassName('table-card');
        for (let i = 0; i < tableCards.length; i++) {
          tableCards[i].addEventListener('click', function() {
            const firstPElement = tableCards[i].querySelector('p');      
            // Kiểm tra xem có phần tử <p> nào không
            if (firstPElement) {
              // Lưu nội dung của phần tử <p> vào biến tableName
              const tableName = firstPElement.textContent;
              bookTable = tableName
              if(table.ten_ban === tableName){
                statusTable = table.tinhtrang
              }
              if (!isShowToastTableExecuted) {
                showSuccessToastTable();
                isShowToastTableExecuted = true;
              }
              tableName = bookTable
            }
            if(bookTable) {
              return;
            }
          });
          
        }
        isShowToastTableExecuted = false;
        });
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add("btn-container")
  
        const reserveButton = document.createElement('button');
        const cancelButton = document.createElement('button');
        reserveButton.textContent = 'Đặt bàn';
        cancelButton.textContent = 'Hủy';
        reserveButton.classList.add('reserve-button');
        reserveButton.classList.add('add-button');
        cancelButton.classList.add('reserve-button');
        cancelButton.classList.add('cancel-button');
        
        buttonContainer.appendChild(reserveButton);
        buttonContainer.appendChild(cancelButton);
        
        // tableElement.appendChild(buttonContainer);
        tableList.appendChild(buttonContainer);

        cancelButton.addEventListener('click', function() {
          // Xử lý khi người dùng nhấp vào nút "Hủy" ở đây
        tableList.classList.add('hidden')
       });
       reserveButton.addEventListener('click', function() {
        if(statusTable == "Con trong" && bookTable !== "Take Away" && bookTable !== "Delivery"){
          
          // Tạo options cho request
          const options = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
          };
          
          // Gửi request lên API
          fetch(`http://127.0.0.1:5000/api/table/book-table/${bookTable}`, options)
            .then(response => {
              if (response.ok) {
                showSuccessToast()  
                console.log('Đã cập nhật dữ liệu thành công');
              } else {
                console.log('Có lỗi xảy ra khi cập nhật dữ liệu');
              }
            })
            .catch(error => {
              console.log('Có lỗi xảy ra:', error);
            });
               

        } else {showErrorToast()}
    })
      })
      .catch(error => {
        console.error(error);
        showErrorToast()
      });

  });
} else {
  // Nếu không có token, chuyển hướng đến trang đăng nhập khi nhấp vào nút "Order Now"
  orderBtn.addEventListener('click', function() {
    window.location.href = './login/login.html';
  });
}


function toast({ title = "", message = "", type = "info", duration = 3000 }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");

    // Auto remove toast
    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);

    // Remove toast when clicked
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };

    const icons = {
      success: "fas fa-check-circle",
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-circle",
      error: "fas fa-exclamation-circle"
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

    toast.innerHTML = `
                    <div class="toast__icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="toast__body">
                        <h3 class="toast__title">${title}</h3>
                        <p class="toast__msg">${message}</p>
                    </div>
                    <div class="toast__close">
                        <i class="fas fa-times"></i>
                    </div>
                `;
    main.appendChild(toast);
  }
}

function showSuccessToast() {
  toast({
    title: "Thành công!",
    message: "Bạn đã Đặt bàn thành công.",
    type: "success",
    duration: 5000
  });
}
function showSuccessToastTable() {
  toast({
    title: "Thành công!",
    message: `Chọn bàn ${tableName} thành công.`,
    type: "success",
    duration: 5000
  });
  console.log(tableName)
}

function showErrorToast() {
  toast({
    title: "Thất bại!",
    message: "Có lỗi xảy ra, vui lòng liên hệ quản trị viên.",
    type: "error",
    duration: 5000
  });
}


const loginStatus = document.getElementById('loginStatus');

if (token) {
  loginStatus.textContent = 'Đăng xuất';
  loginStatus.addEventListener('click', logout);
} else {
  loginStatus.textContent = 'Đăng nhập';
  loginStatus.addEventListener('click', redirectToLogin);
}

function logout() {
  // Thực hiện mã logic để logout
  // ...
  localStorage.removeItem('token');
  window.location.href = './login/login.html';

  // Sau khi logout, có thể chuyển hướng người dùng đến trang đăng nhập hoặc làm gì đó khác
}

// Hàm chuyển hướng đến trang đăng nhập
function redirectToLogin() {
  // Thực hiện mã logic để chuyển hướng đến trang đăng nhập
  console.log("in")
  window.location.href = './login/login.html';

  // ...
}