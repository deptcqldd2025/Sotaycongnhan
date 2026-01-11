/* Version: 1.0 */

// Cấu trúc Menu (Dễ dàng thêm bớt chức năng tại đây)
const MENU_ITEMS = [
    { title: "Bản đồ lưới điện", icon: "🗺️", link: "index.html" },
    { title: "Báo cáo sự cố", icon: "⚠️", link: "report.html" },
    { title: "Lịch công tác", icon: "📅", link: "work-orders.html" },
    { title: "Quản lý hành lang", icon: "🏠", link: "corridor.html" },
    { title: "Thư viện quy định", icon: "📚", link: "library.html" },
    { title: "Hướng dẫn sử dụng", icon: "❓", link: "manual.html" }, // Yêu cầu mới
    { title: "Thông tin tác giả", icon: "ℹ️", link: "author.html" }   // Yêu cầu mới
];

// Hàm khởi tạo UI khi trang load
document.addEventListener("DOMContentLoaded", function() {
    injectSidebar();
    setupEventListeners();
    highlightActiveMenu();
});

function injectSidebar() {
    // 1. Tạo HTML cho Sidebar
    const sidebarHTML = `
        <div id="overlay" class="overlay"></div>
        <div id="sidebar" class="sidebar">
            <div class="sidebar-header">
                <div class="user-avatar"><img src="https://via.placeholder.com/60" alt="Avatar" style="border-radius:50%"></div>
                <div class="user-name">Nguyễn Văn A</div>
                <div class="user-role">Công nhân quản lý - Đội QLĐD</div>
            </div>
            <div class="sidebar-menu" id="menu-list">
                </div>
            <div class="sidebar-footer">
                <p>Phiên bản 1.0</p>
                <a href="#" onclick="alert('Đã đăng xuất')">Đăng xuất</a>
            </div>
        </div>
    `;

    // 2. Chèn vào đầu body
    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    // 3. Render danh sách menu
    const menuList = document.getElementById('menu-list');
    MENU_ITEMS.forEach(item => {
        const a = document.createElement('a');
        a.href = item.link;
        a.innerHTML = `<span style="margin-right:10px">${item.icon}</span> ${item.title}`;
        menuList.appendChild(a);
    });

    // 4. Tìm và gắn sự kiện cho nút Hamburger (nếu trang có nút này)
    const menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleSidebar);
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    // Toggle class để hiện/ẩn
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

function setupEventListeners() {
    // Bấm vào vùng đen (overlay) thì đóng menu
    document.getElementById('overlay').addEventListener('click', toggleSidebar);
}

function highlightActiveMenu() {
    // Tô đậm menu của trang hiện tại
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll('.sidebar-menu a');
    
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}
