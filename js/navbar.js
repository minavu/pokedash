let handleMenuIcon = () => {
    let items = document.querySelectorAll(".menu-container");
    items.forEach(item => {
        if (item.style.display === "block") {
            item.removeAttribute("style");
        } else {
            item.style.display = "block";
            item.style.zIndex = "9";
        }
    })
}

