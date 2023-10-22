import React, { useState, useEffect } from 'react'
import './App.css';
const App = () => {
        const [users, setUsers] = useState([]);
        const [searchTerm, setSearchTerm] = useState("");
        const getUsers = async () => {
                const response = await fetch('http://127.0.0.1:8000/django_api/project/');
                setUsers(await response.json());
        }
    
        useEffect(() => {
            getUsers();
        }, []);


        const cards = document.querySelectorAll('.card');
		const toggleExpansion = (element, to, duration = 350) => {
		  return new Promise((res) => {
		    element.animate([
		      {
			top: to.top,
			left: to.left,
			width: to.width,
			height: to.height
		      }
		    ], {duration, fill: 'forwards', ease: 'ease-in'})
		    setTimeout(res, duration);
		  })
		}

		const fadeContent = (element, opacity, duration = 300) => {
			return new Promise(res => {
				[...element.children].forEach((child) => {
					requestAnimationFrame(() => {
						child.style.transition = `opacity ${duration}ms linear`;
						child.style.opacity = opacity;
					});
				})
				setTimeout(res, duration);
			})
		}
        
		const getCardContent = (title, type) => {
            return`
            
            <div class="card" >
                    <div class="ml-3 w-100">
                    <div class="d-flex flex-column">
                        <span class="A">Project_Technologies</span><span class="B">${users.Project_Technologies  ?? "Not Provided"}</span>
                    </div>
                    <div class="d-flex flex-column">
                        <span class="A">Technical_Skillset.Frontend</span><span class="B">${users.Technical_Skillset_Frontend  ?? "Not Provided"}</span>
                    </div>
                    <div class="d-flex flex-column">
                        <span class="A">Technical_Skillset.Backend</span><span class="B">${users.Technical_Skillset_Backend  ?? "Not Provided"}</span>
                    </div>

                    <div class="d-flex flex-column">
                        <span class="A">Technical_Skillset.Databases</span><span class="B">${users.Technical_Skillset_Databases ?? "Not Provided"}</span>
                    </div>

                    <div class="d-flex flex-column">
                        <span class="A">Technical_Skillset.Infrastructre</span><span class="B">${users.Technical_Skillset_Infrastructre  ?? "Not Provided"}</span>
                    </div>
                    <div class="d-flex flex-column">
                    <span class="A">Other_Information_Availability</span><span class="B">${users.Other_Information_Availability ?? "Not Provided"}</span>
                    </div>
        
                    </div>
        

            </div>
                `
        }
		const onCardClick = async (e) => {
			const card = e.currentTarget;
			const cardClone = card.cloneNode(true);
			const {top, left, width, height} = card.getBoundingClientRect();
			cardClone.style.position = 'fixed';
			cardClone.style.top = top + 'px';
			cardClone.style.left = left + 'px';
			cardClone.style.width = width + 'px';
			cardClone.style.height = height + 'px';
			card.style.opacity = '0';
			card.parentNode.appendChild(cardClone);
			const closeButton = document.createElement('button');
			closeButton.style = `
				position: fixed;
				z-index: 10000;
				top: 35px;
				right: 35px;
				width: 35px;
				height: 35px;
				border-radius: 50%;
				background-color: #e25656;
			`;
			closeButton.addEventListener('click', async () => {
				closeButton.remove();
				cardClone.style.removeProperty('display');
				cardClone.style.removeProperty('padding');
				[...cardClone.children].forEach(child => child.style.removeProperty('display'));
				fadeContent(cardClone, '0');
				await toggleExpansion(cardClone, {top: `${top}px`, left: `${left}px`, width: `${width}px`, height: `${height}px`}, 300)
				card.style.removeProperty('opacity');
				cardClone.remove();
			});
			fadeContent(cardClone, '0')
				.then(() => {
					[...cardClone.children].forEach(child => child.style.display = 'none');
				});
			await toggleExpansion(cardClone, {top: 0, left: 0, width: '50vw', height: '100vh'});
			const content = getCardContent(card.textContent, card.dataset.type)
			cardClone.style.display = 'block';
			cardClone.style.padding = '0';
			cardClone.appendChild(closeButton);
			cardClone.insertAdjacentHTML('afterbegin', content);
		};

		cards.forEach(card => card.addEventListener('click', onCardClick));
    
    return(
        <>
        <h2>List of All Projects</h2>
        <div className="container-fluid mt-5">
        <div className="searchInput_Container">
                    <input id="searchInput" type="text" placeholder="Search here..." onChange={(event) => {
                      setSearchTerm(event.target.value);
                    }} />
                  </div>
            <div className="row text-center">

                {
                    users.filter((curElem) => {
                        if(searchTerm ==""){
                          return curElem;
                        }else if(curElem.Technical_Skillset_Backend.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         curElem.Technical_Skillset_Frontend.toLowerCase().includes(searchTerm.toLowerCase())
                         ||
                         curElem.Project_Title.toLowerCase().includes(searchTerm.toLowerCase())

                         ){
                          return curElem;
                        }
                      })
                    .map((curElem)=> 
                    {
                        return(
                            <div className="col-10 col-md-6 mt-5">
                            <div class="card" >
                                    <div class="ml-3 w-100">
                                        <h4 class="mb-0 mt-0">{curElem.Project_Title}</h4>  
                                    <div class="d-flex flex-column">
                                        <span class="A">Project_Technologies</span><span class="B">{curElem.Project_Technologies  ?? "Not Provided"}</span>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <span class="A">Technical_Skillset.Frontend</span><span class="B">{curElem.Technical_Skillset_Frontend  ?? "Not Provided"}</span>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <span class="A">Technical_Skillset.Backend</span><span class="B">{curElem.Technical_Skillset_Backend  ?? "Not Provided"}</span>
                                    </div>
        
                                    <div class="d-flex flex-column">
                                        <span class="A">Technical_Skillset.Databases</span><span class="B">{curElem.Technical_Skillset_Databases ?? "Not Provided"}</span>
                                    </div>

                                    <div class="d-flex flex-column">
                                        <span class="A">Technical_Skillset.Infrastructre</span><span class="B">{curElem.Technical_Skillset_Infrastructre  ?? "Not Provided"}</span>
                                    </div>
                                   
                                    
                        
                                    </div>
                                </div>
        
                            </div>
        
            
        
                        )
                    })
                }

            </div>
        </div>
        
        
        </>
        
    )
}
export default App
