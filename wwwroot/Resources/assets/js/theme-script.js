// Apply the saved theme settings from local storage
document.querySelector("html").setAttribute("data-theme", localStorage.getItem('theme') || 'light');
document.querySelector("html").setAttribute('data-sidebar', localStorage.getItem('sidebarTheme') || 'light');
document.querySelector("html").setAttribute('data-color', localStorage.getItem('color') || 'primary');
document.querySelector("html").setAttribute('data-topbar', localStorage.getItem('topbar') || 'white');
document.querySelector("html").setAttribute('data-layout', localStorage.getItem('layout') || 'default');
document.querySelector("html").setAttribute('data-topbarcolor', localStorage.getItem('topbarcolor') || 'white');
document.querySelector("html").setAttribute('data-card', localStorage.getItem('card') || 'bordered');
document.querySelector("html").setAttribute('data-size', localStorage.getItem('size') || 'default');
document.querySelector("html").setAttribute('data-width', localStorage.getItem('width') || 'fluid');
document.querySelector("html").setAttribute('data-loader', localStorage.getItem('loader') || 'enable');



document.addEventListener("DOMContentLoaded", function () {

    document.body.insertAdjacentHTML('beforeend', themesettings);

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const lightModeToggle = document.getElementById('light-mode-toggle');
    const darkMode = localStorage.getItem('darkMode');

    function enableDarkMode() {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeToggle.classList.remove('activate');
        lightModeToggle.classList.add('activate');
        localStorage.setItem('darkMode', 'enabled');
    }

    function disableDarkMode() {
        document.documentElement.setAttribute('data-theme', 'light');
        lightModeToggle.classList.remove('activate');
        darkModeToggle.classList.add('activate');
        localStorage.removeItem('darkMode');
    }

    // Check if darkModeToggle and lightModeToggle exist before adding event listeners
    if (darkModeToggle && lightModeToggle) {
        // Check the current mode on page load
        if (darkMode === 'enabled') {
            enableDarkMode();
        } else {
            disableDarkMode();
        }

        // Add event listeners
        darkModeToggle.addEventListener('click', enableDarkMode);
        lightModeToggle.addEventListener('click', disableDarkMode);
    }


    const themeRadios = document.querySelectorAll('input[name="theme"]');
    const sidebarRadios = document.querySelectorAll('input[name="sidebar"]');
    const colorRadios = document.querySelectorAll('input[name="color"]');
    const layoutRadios = document.querySelectorAll('input[name="LayoutTheme"]');
    const topbarRadios = document.querySelectorAll('input[name="topbar"]');
    const sidebarBgRadios = document.querySelectorAll('input[name="sidebarbg"]');
    const topbarcolorRadios = document.querySelectorAll('input[name="topbarcolor"]');
    const cardRadios = document.querySelectorAll('input[name="card"]');
    const sizeRadios = document.querySelectorAll('input[name="size"]');
    const widthRadios = document.querySelectorAll('input[name="width"]');
    const loaderRadios = document.querySelectorAll('input[name="loader"]');
    const topbarbgRadios = document.querySelectorAll('input[name="topbarbg"]');
    const resetButton = document.getElementById('resetbutton');
    const sidebarBgContainer = document.getElementById('sidebarbgContainer');
    const sidebarElement = document.querySelector('.sidebar'); // Adjust this selector to match your sidebar element

    function setThemeAndSidebarTheme(theme, sidebarTheme, color, layout, topbar, topbarcolor, card, size, width, loader) {
        // Check if the sidebar element exists
        if (!sidebarElement) {
            console.error('Sidebar element not found');
            return;
        }

        // Setting data attributes and classes
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('data-sidebar', sidebarTheme);
        document.documentElement.setAttribute('data-color', color);
        document.documentElement.setAttribute('data-layout', layout);
        document.documentElement.setAttribute('data-topbar', topbar);
        document.documentElement.setAttribute('data-topbarcolor', topbarcolor);
        document.documentElement.setAttribute('data-card', card);
        document.documentElement.setAttribute('data-size', size);
        document.documentElement.setAttribute('data-width', width);
        document.documentElement.setAttribute('data-loader', loader);

        //track mini-layout set or not
        layout_mini = 0;
        if (layout === 'mini') {
            document.body.classList.add("mini-sidebar");
            document.body.classList.remove("menu-horizontal");
            layout_mini = 1;
        } else if (layout === 'horizontal') {
            document.body.classList.add("menu-horizontal");
            document.body.classList.remove("mini-sidebar");
        } else if (layout === 'horizontal-single') {
            document.body.classList.add("menu-horizontal");
            document.body.classList.remove("mini-sidebar");
        } else if (layout === 'horizontal-overlay') {
            document.body.classList.add("menu-horizontal");
            document.body.classList.remove("mini-sidebar");
        } else {
            document.body.classList.remove("mini-sidebar", "menu-horizontal");
        }


        if (size === 'compact') {
            document.body.classList.add("mini-sidebar");
            document.body.classList.remove("expand-menu");
            layout_mini = 1;
        } else if (size === 'hoverview') {
            document.body.classList.add("expand-menu");
            if (layout_mini == 0) { //remove only mini sidebar not set
                document.body.classList.remove("mini-sidebar");
            }
        } else {
            if (layout_mini == 0) { //remove only mini sidebar not set
                document.body.classList.remove("mini-sidebar");
            }
            document.body.classList.remove("expand-menu");
        }

        if (width === 'box') {
            document.body.classList.add("layout-box-mode");
            document.body.classList.add("mini-sidebar");
            layout_mini = 1;
        } else {
            if (layout_mini == 0) { //remove only mini sidebar not set
                document.body.classList.remove("mini-sidebar");
            }
            document.body.classList.remove("layout-box-mode");
        }
        if (((width === 'box') && (layout === 'horizontal')) || ((width === 'box') && (layout === 'horizontal-overlay')) ||
            ((width === 'box') && (layout === 'horizontal-single')) || ((width === 'box') && (layout === 'without-header'))) {
            document.body.classList.remove("mini-sidebar");
        }

        // Saving to localStorage
        localStorage.setItem('theme', theme);
        localStorage.setItem('sidebarTheme', sidebarTheme);
        localStorage.setItem('color', color);
        localStorage.setItem('layout', layout);
        localStorage.setItem('topbar', topbar);
        localStorage.setItem('topbarcolor', topbarcolor);
        localStorage.setItem('card', card);
        localStorage.setItem('size', size);
        localStorage.setItem('width', width);
        localStorage.setItem('loader', loader);
        //localStorage.removeItem('primaryRGB');

        // Show/hide sidebar background options based on layout selection
        if (layout === 'box' && sidebarBgContainer) {
            sidebarBgContainer.classList.add('show');
        } else if (sidebarBgContainer) {
            sidebarBgContainer.classList.remove('show');
        }
    }

    function handleSidebarBgChange() {
        const sidebarBg = document.querySelector('input[name="sidebarbg"]:checked') ? document.querySelector('input[name="sidebarbg"]:checked').value : null;

        if (sidebarBg) {
            document.body.setAttribute('data-sidebarbg', sidebarBg);
            localStorage.setItem('sidebarBg', sidebarBg);
        } else {
            document.body.removeAttribute('data-sidebarbg');
            localStorage.removeItem('sidebarBg');
        }
    }

    function handleTopbarBgChange() {
        const topbarbg = document.querySelector('input[name="topbarbg"]:checked') ? document.querySelector('input[name="topbarbg"]:checked').value : null;

        if (topbarbg) {
            document.body.setAttribute('data-topbarbg', topbarbg);
            localStorage.setItem('topbarbg', topbarbg);
        } else {
            document.body.removeAttribute('data-topbarbg');
            localStorage.removeItem('topbarbg');
        }
    }

    function handleInputChange() {
        const theme = document.querySelector('input[name="theme"]:checked').value;
        const layout = document.querySelector('input[name="LayoutTheme"]:checked').value;
        const card = document.querySelector('input[name="card"]:checked').value;
        const size = document.querySelector('input[name="size"]:checked').value;
        const width = document.querySelector('input[name="width"]:checked').value;
        const loader = document.querySelector('input[name="loader"]:checked').value;


        color = localStorage.getItem('primaryRGB');
        sidebarTheme = localStorage.getItem('sidebarRGB');
        topbar = localStorage.getItem('topbarRGB');
        topbarcolor = localStorage.getItem('topbarcolorRGB');

        if (document.querySelector('input[name="color"]:checked') != null) {
            color = document.querySelector('input[name="color"]:checked').value;
        } else {
            color = 'all'
        }

        if (document.querySelector('input[name="sidebar"]:checked') != null) {
            sidebarTheme = document.querySelector('input[name="sidebar"]:checked').value;
        } else {
            sidebarTheme = 'all'
        }

        if (document.querySelector('input[name="topbar"]:checked') != null) {
            topbar = document.querySelector('input[name="topbar"]:checked').value;
        } else {
            topbar = 'all'
        }

        if (document.querySelector('input[name="topbarcolor"]:checked') != null) {
            topbarcolor = document.querySelector('input[name="topbarcolor"]:checked').value;
        } else {
            topbarcolor = 'all'
        }

        setThemeAndSidebarTheme(theme, sidebarTheme, color, layout, topbar, topbarcolor, card, size, width, loader);
    }

    function resetThemeAndSidebarThemeAndColorAndBg() {
        setThemeAndSidebarTheme('light', 'light', 'primary', 'default', 'white', 'white', 'bordered', 'default', 'fluid', 'enable');
        document.body.removeAttribute('data-sidebarbg');
        document.body.removeAttribute('data-topbarbg');

        document.getElementById('lightTheme').checked = true;
        document.getElementById('lightSidebar').checked = true;
        document.getElementById('primaryColor').checked = true;
        document.getElementById('defaultLayout').checked = true;
        document.getElementById('whiteTopbar').checked = true;
        document.getElementById('whiteTopbarcolor').checked = true;
        document.getElementById('borderedCard').checked = true;
        document.getElementById('defaultSize').checked = true;
        document.getElementById('fluidWidth').checked = true;
        document.getElementById('enableLoader').checked = true;

        const checkedSidebarBg = document.querySelector('input[name="sidebarbg"]:checked');
        if (checkedSidebarBg) {
            checkedSidebarBg.checked = false;
        }

        localStorage.removeItem('sidebarBg');

        const checkedTopbarBg = document.querySelector('input[name="topbarbg"]:checked');
        if (checkedTopbarBg) {
            checkedTopbarBg.checked = false;
        }

        localStorage.removeItem('topbarbg');
    }

    // Adding event listeners
    themeRadios.forEach(radio => radio.addEventListener('change', handleInputChange));
    sidebarRadios.forEach(radio => radio.addEventListener('change', handleInputChange));
    colorRadios.forEach(radio => radio.addEventListener('change', handleInputChange));
    layoutRadios.forEach(radio => radio.addEventListener('change', handleInputChange));
    topbarRadios.forEach(radio => radio.addEventListener('change', handleInputChange));
    topbarcolorRadios.forEach(radio => radio.addEventListener('change', handleInputChange));
    cardRadios.forEach(radio => radio.addEventListener('change', handleInputChange));
    sizeRadios.forEach(radio => radio.addEventListener('change', handleInputChange));
    widthRadios.forEach(radio => radio.addEventListener('change', handleInputChange));
    loaderRadios.forEach(radio => radio.addEventListener('change', handleInputChange));
    sidebarBgRadios.forEach(radio => radio.addEventListener('change', handleSidebarBgChange));
    topbarbgRadios.forEach(radio => radio.addEventListener('change', handleTopbarBgChange));
    resetButton.addEventListener('click', resetThemeAndSidebarThemeAndColorAndBg);

    // Initial setup from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    savedSidebarTheme = localStorage.getItem('sidebarTheme');
    savedColor = localStorage.getItem('color');
    const savedLayout = localStorage.getItem('layout') || 'default';
    savedTopbar = localStorage.getItem('topbar');
    savedTopbarcolor = localStorage.getItem('topbarcolor');
    const savedCard = localStorage.getItem('card') || 'bordered';
    const savedSize = localStorage.getItem('size') || 'default';
    const savedWidth = localStorage.getItem('width') || 'fluid';
    const savedLoader = localStorage.getItem('loader') || 'enable';
    const savedSidebarBg = localStorage.getItem('sidebarBg') || null;
    const savedTopbarBg = localStorage.getItem('topbarbg') || null;

    // setup theme color all
    const savedColorPickr = localStorage.getItem('primaryRGB')
    if ((savedColor == null) && (savedColorPickr == null)) {
        savedColor = 'primary';
    } else if ((savedColorPickr != null) && (savedColor == null)) {
        savedColor = 'all';
        let html = document.querySelector("html");
        html.style.setProperty("--primary-rgb", savedColorPickr);
    }

    // setup theme topbar all
    const savedTopbarPickr = localStorage.getItem('topbarRGB')
    if ((savedTopbar == null) && (savedTopbarPickr == null)) {
        savedTopbar = 'white';
    } else if ((savedTopbarPickr != null) && (savedTopbar == null)) {
        savedTopbar = 'all';
        let html = document.querySelector("html");
        html.style.setProperty("--topbar-rgb", savedTopbarPickr);
    }


    // setup theme topbarcolor all
    const savedTopbarcolorPickr = localStorage.getItem('topbarcolorRGB')
    if ((savedTopbarcolor == null) && (savedTopbarcolorPickr == null)) {
        savedTopbarcolor = 'white';
    } else if ((savedTopbarcolorPickr != null) && (savedTopbarcolor == null)) {
        savedTopbarcolor = 'all';
        let html = document.querySelector("html");
        html.style.setProperty("--topbarcolor-rgb", savedTopbarcolorPickr);
    }


    // setup theme color all
    const savedSidebarPickr = localStorage.getItem('sidebarRGB')
    if ((savedSidebarTheme == null) && (savedSidebarPickr == null)) {
        savedSidebarTheme = 'light';
    } else if ((savedSidebarPickr != null) && (savedSidebarTheme == null)) {
        savedSidebarTheme = 'all';
        let html = document.querySelector("html");
        html.style.setProperty("--sidebar-rgb", savedSidebarPickr);
    }


    setThemeAndSidebarTheme(savedTheme, savedSidebarTheme, savedColor, savedLayout, savedTopbar, savedTopbarcolor, savedCard, savedSize, savedWidth, savedLoader);

    if (savedSidebarBg) {
        document.body.setAttribute('data-sidebarbg', savedSidebarBg);
    } else {
        document.body.removeAttribute('data-sidebarbg');
    }

    if (savedTopbarBg) {
        document.body.setAttribute('data-topbarbg', savedTopbarBg);
    } else {
        document.body.removeAttribute('data-topbarbg');
    }

    // Check and set radio buttons based on saved preferences
    if (document.getElementById(`${savedTheme}Theme`)) {
        document.getElementById(`${savedTheme}Theme`).checked = true;
    }
    if (document.getElementById(`${savedSidebarTheme}Sidebar`)) {
        document.getElementById(`${savedSidebarTheme}Sidebar`).checked = true;
    }
    if (document.getElementById(`${savedColor}Color`)) {
        document.getElementById(`${savedColor}Color`).checked = true;
    }
    if (document.getElementById(`${savedLayout}Layout`)) {
        document.getElementById(`${savedLayout}Layout`).checked = true;
    }
    if (document.getElementById(`${savedTopbar}Topbar`)) {
        document.getElementById(`${savedTopbar}Topbar`).checked = true;
    }
    if (document.getElementById(`${savedTopbarcolor}Topbarcolor`)) {
        document.getElementById(`${savedTopbarcolor}Topbarcolor`).checked = true;
    }
    if (document.getElementById(`${savedCard}Card`)) {
        document.getElementById(`${savedCard}Card`).checked = true;
    }
    if (document.getElementById(`${savedSize}Size`)) {
        document.getElementById(`${savedSize}Size`).checked = true;
    }
    if (document.getElementById(`${savedWidth}Width`)) {
        document.getElementById(`${savedWidth}Width`).checked = true;
    }
    if (document.getElementById(`${savedLoader}Loader`)) {
        document.getElementById(`${savedLoader}Loader`).checked = true;
    }
    if (savedSidebarBg && document.getElementById(`${savedSidebarBg}`)) {
        document.getElementById(`${savedSidebarBg}`).checked = true;
    }
    if (savedTopbarBg && document.getElementById(`${savedTopbarBg}`)) {
        document.getElementById(`${savedTopbarBg}`).checked = true;
    }

    // Initially hide sidebar background options based on layout
    if (savedLayout !== 'box' && sidebarBgContainer) {
        sidebarBgContainer.classList.remove('show');
    }
});



















