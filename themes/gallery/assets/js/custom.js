document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("featuredSlider");
  const dots = document.querySelectorAll(".slider-dots .dot");
  const slides = slider.querySelectorAll(".slide");
  const slideWidth = slides[0].offsetWidth;

  let index = 1;
  let isTransitioning = false;

  const goToSlide = (i) => {
    if (isTransitioning) return;
    isTransitioning = true;
    index = i;
    slider.style.transition = "transform 0.5s ease";
    slider.style.transform = `translateX(-${slideWidth * index}px)`;
    updateDots();
  };

  const updateDots = () => {
    let activeDotIndex = index;
    if (index === 0) {
      activeDotIndex = dots.length; // 显示最后一张时（前面加了一张）高亮最后一个点
    } else if (index === slides.length - 1) {
      activeDotIndex = 1; // 显示第一张时（后面加了一张）高亮第一个点
    }
    dots.forEach((d, i) => {
      d.classList.toggle("active", i + 1 === activeDotIndex);
    });
  };

  // 点击分页圆点
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goToSlide(parseInt(dot.dataset.index));
    });
  });

  // 自动轮播
  const startAutoSlide = () => {
    setInterval(() => {
      if (index >= slides.length - 1) {
        index = 1;
        slider.style.transition = "none";
        slider.style.transform = `translateX(-${slideWidth * index}px)`;
      }
      setTimeout(() => goToSlide(index + 1), 20);
    }, 2800); // 滚动节奏：每4秒滚动一次
  };

  // 监听过渡结束，处理循环
  slider.addEventListener("transitionend", () => {
    if (index >= slides.length - 1) {
      slider.style.transition = "none";
      index = 1;
      slider.style.transform = `translateX(-${slideWidth * index}px)`;
    } else if (index <= 0) {
      slider.style.transition = "none";
      index = slides.length - 2;
      slider.style.transform = `translateX(-${slideWidth * index}px)`;
    }
    isTransitioning = false;
    updateDots(); // 修复指示器在循环瞬移后未更新的问题
  });

  goToSlide(index);
  startAutoSlide();
});
