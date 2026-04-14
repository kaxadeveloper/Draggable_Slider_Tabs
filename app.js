const tabsBox = document.querySelector(".tabs-box"),
      allTabs = document.querySelectorAll(".tab"),
      arrowIcons = document.querySelectorAll(".icon i");

let isDragging = false;

// ✅ Handle arrow visibility
const handleIcons = () => {
    let scrollVal = tabsBox.scrollLeft;
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;

    let tolerance = 5; // fixes precision issues

    // Hide LEFT arrow at start
    arrowIcons[0].parentElement.style.display =
        scrollVal <= tolerance ? "none" : "flex";

    // Hide RIGHT arrow at end
    arrowIcons[1].parentElement.style.display =
        scrollVal >= maxScrollableWidth - tolerance ? "none" : "flex";
};

// ✅ Arrow click scroll
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        tabsBox.scrollLeft += icon.id === "left" ? -350 : 350;
    });
});

// ✅ Active tab switch + auto center
allTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const activeTab = tabsBox.querySelector(".active");
        if (activeTab) activeTab.classList.remove("active");

        tab.classList.add("active");

        // 🔥 auto scroll clicked tab into center
        tab.scrollIntoView({
            behavior: "smooth",
            inline: "center"
        });
    });
});

// ✅ Dragging functionality
const dragging = (e) => {
    if (!isDragging) return;
    tabsBox.classList.add("dragging");
    tabsBox.scrollLeft -= e.movementX;
};

// ✅ Stop dragging
const dragStop = () => {
    isDragging = false;
    tabsBox.classList.remove("dragging");
    document.body.style.userSelect = "auto";
};

// ✅ Mouse events
tabsBox.addEventListener("mousedown", () => {
    isDragging = true;
    document.body.style.userSelect = "none";
});

tabsBox.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

// ✅ Update arrows on scroll
tabsBox.addEventListener("scroll", handleIcons);

// ✅ Initialize on load
handleIcons();