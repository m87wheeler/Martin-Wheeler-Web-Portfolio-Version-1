// ***** dynamically generate project post windows *****
const projectPostArray = []
const createProjectWindow = (post, containerId) => {
  let projectContainer = document.createElement("div")
  projectContainer.classList.add("project-container")
  projectContainer.addEventListener(
    "click",
    () => {
      projectContainer.children[2].style.marginTop = "0"
      projectContainer.children[0].children[1].classList.add("project-link-pop")
    },

    false
  )

  let backgroundImgContainer = document.createElement("div")
  backgroundImgContainer.classList.add("background-img")
  projectContainer.appendChild(backgroundImgContainer)

  let backgroundImg = document.createElement("img")
  backgroundImg.src = post.metadata.projectimage.imgix_url
  backgroundImgContainer.appendChild(backgroundImg)

  let projectLinkContainer = document.createElement("div")
  projectLinkContainer.classList.add("project-link")
  backgroundImgContainer.appendChild(projectLinkContainer)

  let projectLink = document.createElement("a")
  projectLink.innerText = "Visit Website"
  projectLink.href = post.metadata.projectlink
  projectLinkContainer.appendChild(projectLink)

  let slideInContainer = document.createElement("div")
  slideInContainer.classList.add("slide-in-blocks")
  projectContainer.appendChild(slideInContainer)

  let slideInLeft = document.createElement("div")
  slideInLeft.classList.add("slide-in-left")
  slideInContainer.appendChild(slideInLeft)

  let slideInRight = document.createElement("div")
  slideInRight.classList.add("slide-in-right")
  slideInContainer.appendChild(slideInRight)

  let projectBlurb = document.createElement("div")
  projectBlurb.classList.add("project-blurb")
  projectContainer.appendChild(projectBlurb)

  let blurbText = document.createElement("p")
  blurbText.classList.add("blurb-text")
  blurbText.innerText = post.metadata.projectblurb
  projectBlurb.appendChild(blurbText)

  document.querySelector(containerId).appendChild(projectContainer)
  projectPostArray.push(projectContainer)
}

// ***** reset all selected project posts on scroll *****
window.addEventListener(
  "scroll",
  () => {
    projectPostArray.forEach(post => {
      post.children[2].style.marginTop = "-8rem"
      post.children[0].children[1].classList.remove("project-link-pop")
    })
  },
  false
)
