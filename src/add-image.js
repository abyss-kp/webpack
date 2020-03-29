import Photo from './Website-Design-Background.png'
function addImage(){
  const img=document.createElement('img')
  img.alt="Image"
  img.width='300'
  img.src=Photo
  const body =document.querySelector('body')
  body.appendChild(img)
}

export default addImage;