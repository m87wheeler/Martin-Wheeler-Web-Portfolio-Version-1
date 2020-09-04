"use strict"

// ***** animate landing transition *****
const LANDING_BTN = document.querySelector(".view-portfolio-text")
if (LANDING_BTN) {
  LANDING_BTN.addEventListener(
    "click",
    () => {
      let dropLines = document.querySelectorAll(".drop-line")
      dropLines.forEach((line, i) => line.classList.add(`drop-line--${i + 1}`))
      setTimeout(() => {
        window.scrollTo({
          top: window.innerHeight + 10,
          left: 0,
          behavior: "auto",
        })
      }, 500)
      setTimeout(() => {
        dropLines.forEach((line, i) =>
          line.classList.remove(`drop-line--${i + 1}`)
        )
      }, 3000)
    },
    false
  )
}

// ***** set nav open state *****
let navOpen = false

// ***** dropdown on hamburger click *****
const navDropdown = bool => {
  const DROPDOWN = document.querySelector(".dropdown-back")
  bool ? (DROPDOWN.style.top = "0px") : (DROPDOWN.style.top = "-90vh")
}

// ***** animate dropdown elements *****
const animateDropdownElements = bool => {
  // dropdown shape
  const SHAPE = document.querySelector(".dropdown-shape")
  if (bool) {
    SHAPE.style.bottom = "0"
  } else {
    setTimeout(() => {
      SHAPE.style.bottom = "-90vh"
    }, 50)
  }

  // dropdown list
  const LIST_ITEMS = document.querySelectorAll(".mobile-li")
  if (bool) {
    let i = 0
    function flyIn() {
      setTimeout(() => {
        if (i < LIST_ITEMS.length) {
          LIST_ITEMS[i].style.transform = "translateX(-50%)"
          i++
          flyIn()
        }
      }, 100)
    }
    flyIn()
  } else {
    LIST_ITEMS.forEach(item => (item.style.transform = "translateX(-300%)"))
  }
}

// ***** add event listener to hamburger *****
const NAV_BUTTON = document.querySelector(".nav-hamburger")
NAV_BUTTON.addEventListener(
  "click",
  () => {
    navOpen = !navOpen
    if (navOpen) {
      document
        .querySelectorAll(".bar")
        .forEach(bar => bar.classList.add("open"))
    } else {
      document
        .querySelectorAll(".bar")
        .forEach(bar => bar.classList.remove("open"))
    }
    navDropdown(navOpen)
    animateDropdownElements(navOpen)
  },
  false
)

// ***** hide navbar on link selection *****
const NAV_LINKS = document.querySelectorAll(".mobile-li")
NAV_LINKS.forEach(link =>
  link.addEventListener(
    "click",
    () => {
      navOpen
        ? ((navOpen = !navOpen),
          navDropdown(navOpen),
          document
            .querySelectorAll(".bar")
            .forEach(bar => bar.classList.remove("open")))
        : null
    },
    false
  )
)

// ***** hide nav on scroll *****
window.addEventListener(
  "scroll",
  () => {
    if (window.innerWidth < 1320) {
      navOpen
        ? ((navOpen = !navOpen),
          navDropdown(navOpen),
          document
            .querySelectorAll(".bar")
            .forEach(bar => bar.classList.remove("open")))
        : null
    }
  },
  false
)

// ***** shrink navbar on scroll *****
const WINDOW_HEIGHT = window.innerHeight
const NAVBAR = document.querySelector(".nav-background")
const SMALL_LOGO = document.querySelector(".small-logo-container")
if (document.querySelector("#blog-posts") !== null) {
  document.addEventListener(
    "scroll",
    () => {
      if (window.innerWidth < 1320) {
        if (window.scrollY > WINDOW_HEIGHT) {
          SMALL_LOGO.style.opacity = "1"
          NAVBAR.style.top = "0"
          NAV_BUTTON.style.opacity = "1"
        } else {
          SMALL_LOGO.style.opacity = "0"
          NAVBAR.style.top = "-70px"
          NAV_BUTTON.style.opacity = "0"
        }
      } else {
        let logo = document.querySelector(".logo-container")
        let nav = document.querySelector(".nav-background")
        if (
          logo.getBoundingClientRect().bottom <
          nav.getBoundingClientRect().bottom
        ) {
          SMALL_LOGO.style.opacity = "1"
        } else {
          SMALL_LOGO.style.opacity = "0"
        }
      }
    },
    false
  )
} else if (document.querySelector("#blog-list") !== null) {
  SMALL_LOGO.style.opacity = "1"
  NAVBAR.style.top = "0"
  NAV_BUTTON.style.opacity = "1"
}

// ***** scroll to top button *****
document.querySelector(".back-to-top").addEventListener(
  "click",
  () => {
    if (window.innerWidth < 1320) {
      if (document.querySelector("#blog-posts") !== null) {
        window.scrollTo({ top: window.innerHeight + 1, behavior: "smooth" })
      } else if (document.querySelector("#blog-list") !== null) {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  },
  false
)

// ***** dynamic class based on img orientation *****
// ** adds correct class to image to ensure correct orientation display **
const imgOrientation = imgURL => {
  const img = new Image()
  img.src = imgURL
  if (img.width > img.height) {
    return "landscape"
  } else if (img.height > img.width) {
    return "portrait"
  } else if (img.height === img.width) {
    return "square"
  }
}

// ***** dynamically generate modal *****
let projectDataArray = []
const PROJECT_MODAL = document.querySelector("#project-modal")

// modal elements
const MODAL_IMAGE = document.querySelector("#modal-image")
const MODAL_TITLE = document.querySelector("#project-header")
const MODAL_WORKTYPE = document.querySelector("#project-worktype")
const MODAL_URL = document.querySelector("#project-link")
let MODAL_LANG = document.querySelector("#lang-images")
const MODAL_TEXT = document.querySelector("#about-text")
const LEAVE_MODAL_BUTTON = document.querySelector("#leave-modal")
const OUTER_MODAL = document.querySelector("#outer-modal")

const exitModal = () => {
  PROJECT_MODAL.scrollTo({
    top: "0",
    left: "0",
    behavior: "smooth",
  })
  PROJECT_MODAL.style.left = "-150vw"
  MODAL_IMAGE.setAttribute("src", "")
  MODAL_TITLE.textContent = ""
  MODAL_WORKTYPE.textContent = ""
  MODAL_URL.setAttribute("href", "")
  MODAL_TEXT.innerHTML = ""

  while (MODAL_LANG.childElementCount > 0) {
    MODAL_LANG.removeChild(MODAL_LANG.childNodes[0])
  }

  document.body.style.overflowY = "auto"
  document.body.style.paddingRight = "0"

  OUTER_MODAL.style.right = "100vw"
}

OUTER_MODAL.addEventListener("click", exitModal, false)

LEAVE_MODAL_BUTTON.addEventListener("click", exitModal, false)
const populateModal = slug => {
  const projectObj = projectDataArray[0].find(post => post.slug === slug)

  MODAL_IMAGE.setAttribute(
    "src",
    `${projectObj.metadata.projectimage.url}?auto=format,compress&w=800&dpr=2`
  )
  MODAL_TITLE.textContent = projectObj.title
  MODAL_WORKTYPE.textContent = projectObj.metadata.work_type
  MODAL_URL.setAttribute("href", projectObj.metadata.projectLink)
  MODAL_TEXT.innerHTML = projectObj.content

  const langArr = Object.keys(projectObj.metadata).filter(property =>
    property.includes("lang_")
  )

  langArr.forEach(lang => {
    if (projectObj.metadata[lang].imgix_url) {
      const img = document.createElement("img")
      img.src = `${projectObj.metadata[lang].imgix_url}?auto=format,compress&w=200&dpr=2`
      MODAL_LANG.appendChild(img)
    }
  })

  OUTER_MODAL.style.right = "0"
}

// ***** updated project generator *****
let projectPostArray = []
const createProjectWindow = (post, containerId) => {
  let projectContainer = document.createElement("div")
  projectContainer.classList.add("project-container")
  projectContainer.setAttribute("value", post.slug)
  projectContainer.addEventListener("click", () => {
    PROJECT_MODAL.style.left = "0"
    populateModal(post.slug)
    document.body.style.overflowY = "hidden"
    document.body.style.paddingRight = "15px"
  })

  let backgroundImgContainer = document.createElement("div")
  backgroundImgContainer.classList.add("background-img")
  projectContainer.appendChild(backgroundImgContainer)

  let backgroundImg = document.createElement("img")
  backgroundImg.src = `${post.metadata.projectimage.imgix_url}?auto=format,compress&w=1000&dpr=2`
  backgroundImgContainer.appendChild(backgroundImg)

  document.querySelector(containerId).appendChild(projectContainer)
  projectPostArray.push(projectContainer)
}

// ***** dynamically generate blog post windows *****
const createPostWindow = (post, containerId) => {
  let postContainer = document.createElement("div")
  postContainer.classList.add("blog-short-container")

  let postLink = document.createElement("a")
  postLink.href = `/${post.slug}.html`
  postContainer.appendChild(postLink)

  let blogImageContainer = document.createElement("div")
  blogImageContainer.classList.add("blog-short-image")
  postLink.appendChild(blogImageContainer)

  let blogImage = document.createElement("img")
  blogImage.src = post.metadata.post_image.imgix_url
  blogImage.classList.add(imgOrientation(post.metadata.post_image.imgix_url))
  blogImageContainer.appendChild(blogImage)

  let blogHead = document.createElement("div")
  blogHead.classList.add("blog-short-head")
  postLink.appendChild(blogHead)

  let blogHeader = document.createElement("h2")
  blogHeader.innerText = post.title
  blogHead.appendChild(blogHeader)

  let postDateContainer = document.createElement("div")
  postDateContainer.classList.add("blog-post-date")
  blogHead.appendChild(postDateContainer)

  for (let i = 0; i < 6; i++) {
    let dateDigit = document.createElement("div")
    dateDigit.classList.add("post-date")
    postDateContainer.appendChild(dateDigit)
    let date = post.metadata.post_date
    switch (i) {
      case 0:
        dateDigit.innerText = date.charAt(8)
        dateDigit.classList.add("b-d-digit-1")
        break
      case 1:
        dateDigit.innerText = date.charAt(9)
        dateDigit.classList.add("b-d-digit-2")
        break
      case 2:
        dateDigit.innerText = date.charAt(5)
        dateDigit.classList.add("b-m-digit-1")
        break
      case 3:
        dateDigit.innerText = date.charAt(6)
        dateDigit.classList.add("b-m-digit-2")
        break
      case 4:
        dateDigit.innerText = date.charAt(2)
        dateDigit.classList.add("b-y-digit-1")
        break
      case 5:
        dateDigit.innerText = date.charAt(3)
        dateDigit.classList.add("b-y-digit-2")
        break
    }
  }

  let horizontalRule = document.createElement("div")
  horizontalRule.classList.add("blog-short-divide")
  postLink.appendChild(horizontalRule)
  let bar1 = document.createElement("div")
  horizontalRule.appendChild(bar1)

  let blogBlurbContainer = document.createElement("div")
  blogBlurbContainer.classList.add("blog-short-blurb")
  blogBlurbContainer.innerHTML = post.content
  postLink.appendChild(blogBlurbContainer)

  document.querySelector(`#${containerId}`).appendChild(postContainer)
}

// ***** API Key *****
const KEY = "N6C2ydBXJRnJGr5xKPQfW16ea2qANsnZoNgLzW5hXvAUIjN8FY"

// ***** fetch project data *****
const PROJECT_ENDPOINT = `https://api.cosmicjs.com/v1/mwwdd-blog/objects?pretty=true&hide_metafields=true&type=projects&read_key=${KEY}&limit=20&props=slug,title,content,metadata,`
const fetchProjectData = () => {
  fetch(PROJECT_ENDPOINT)
    .then(res => res.json())
    .then(data => {
      projectDataArray = [data.objects]
      data.objects.forEach(obj =>
        createProjectWindow(obj, "#projects-container")
      )
    })
    .catch(err => console.log("Error:", err))
}
fetchProjectData()

// ***** fetch blog post data *****
const BLOG_ENDPOINT = `https://api.cosmicjs.com/v1/mwwdd-blog/objects?pretty=true&hide_metafields=true&type=blogposts&read_key=${KEY}&limit=20&props=slug,title,content,metadata,`

const fetchBlogData = () => {
  fetch(BLOG_ENDPOINT)
    .then(res => res.json())
    .then(data => {
      if (document.querySelector("#blog-posts") !== null) {
        data.objects.forEach((post, i) => {
          i < 3 ? createPostWindow(post, "blog-posts") : null
        })
      } else if (document.querySelector("#blog-list") !== null) {
        data.objects.forEach((post, i) => {
          createPostWindow(post, "blog-list")
        })
      }
    })
    .catch(err => console.log("Error:", err))
}
fetchBlogData()

// ***** reset all selected project posts on scroll *****
// ***** REMOVED *****

// ***** landing page container *****
const landingPage = document.querySelector("#landing-page")

// ***** pass random color to element from predefined array *****
const randomColor = elem => {
  let colors = [
    "#476763",
    "#ee681e",
    "#ec7d42",
    "#f6c57f",
    "#aeb974",
    "#f1db7b",
  ]
  elem.style.background = colors[Math.floor(Math.random() * colors.length)]
}

// ***** create color dots on laptop/desktop screen *****
const generateColorDots = parent => {
  let containerWidth = parent.clientWidth
  let containerHeight = parent.clientHeight
  // console.log("W:" + containerWidth, "H:" + containerHeight)

  const dotDimensions = {
    height: 20,
    width: 20,
    margin: 1,
    totalHeight: function () {
      return this.height + this.margin * 2
    },
    totalWidth: function () {
      return this.width + this.margin * 2
    },
  }

  let xDots = Math.floor(containerWidth / dotDimensions.totalWidth())
  let yDots = Math.floor(containerHeight / dotDimensions.totalHeight())
  let totalDots = xDots * yDots

  let dotContainer = document.createElement("div")
  dotContainer.classList.add("dot-container")
  parent.appendChild(dotContainer)

  function createDot(dimensions) {
    let dot = document.createElement("div")
    dot.classList.add("color-dot")
    dot.style.height = `${dimensions.height}px`
    dot.style.width = `${dimensions.width}px`
    dot.style.margin = `${dimensions.margin}px`
    dot.addEventListener(
      "mouseover",
      () => {
        randomColor(dot)
      },
      false
    )

    dotContainer.appendChild(dot)
  }

  for (let i = 0; i < totalDots; i++) {
    createDot(dotDimensions)
  }
}
generateColorDots(landingPage)

const onResize = () => {
  if (window.innerWidth > 1320) {
    generateColorDots(landingPage)
  }
}
window.onresize = onResize

// ***** show language text on click *****
const languageContainers = document.querySelectorAll(".lang-container")
languageContainers.forEach(container => {
  container.addEventListener(
    "click",
    () => {
      container.children[1].style.top = "120px"
      container.children[1].style.opacity = "1"
    },
    false
  )
})

// ***** toggle theme *****
const THEME_TOGGLE = document.querySelector("input[name=theme]")
const THEME_TOGGLE_CONTAINER = document.querySelector("#toggle-theme")
window.addEventListener(
  "scroll",
  () => {
    if (window.innerWidth < 1320) {
      window.scrollY > window.innerHeight
        ? (THEME_TOGGLE_CONTAINER.style.opacity = "1")
        : (THEME_TOGGLE_CONTAINER.style.opacity = "0")
    }
  },
  false
)

const trans = () => {
  document.documentElement.classList.add("transition")
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition")
  }, 1000)
}
THEME_TOGGLE.addEventListener(
  "change",
  () => {
    if (THEME_TOGGLE.checked) {
      trans()
      document.documentElement.setAttribute("data-theme", "dark")
    } else {
      trans()
      document.documentElement.setAttribute("data-theme", "light")
    }
  },
  false
)

// ***** animate prompt text *****
const TEXT_SPAN = document.querySelectorAll(".toggle-text span")
setTimeout(() => {
  TEXT_SPAN[0].style.left = "0"
  setTimeout(() => {
    TEXT_SPAN[1].style.left = "0"
  }, 100)
  setTimeout(() => {
    TEXT_SPAN.forEach(span => {
      span.style.left = "-8rem"
    })
  }, 10000)
}, 10000)
