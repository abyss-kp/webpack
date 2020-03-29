import './heading.scss'
class Heading{
  render(){
    const h1=document.createElement('h1')
    const body=document.createElement('body')
    h1.innerHTML="Webpak is awesome"
    body.appendChild(h1)
  }
}
export default Heading