let handleMenuIcon = () => {
    let items = document.querySelectorAll(".menu-container");
    items.forEach(item => {
        if (item.style.display === "block") {
            item.style.display = "none";
        } else {
            item.style.display = "block";
        }
    })
}