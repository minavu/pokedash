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


