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
<<<<<<< HEAD
let displayMenu = () => {
    let items = document.querySelectorAll(".menu-container");
    items.forEach(item => {
		if (window.outerWidth >= 550 ){
        if (item.style.display === "none") {
            item.style.display = "block";
	    }
		}
		
		if (window.outerWidth <= 550 ){
        if (item.style.display === "block") {
            item.style.display = "none";
	    }
		}
   })
}

=======
>>>>>>> searchbar

