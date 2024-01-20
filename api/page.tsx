export default async function getFoodOptions(date: string, time: string, location: string) {
    const url = `http://api.hfs.purdue.edu/menus/v1/locations/${location}/${date}`;

    fetch(url)
      .then(  
        function(response) {  
          if (response.status !== 200) {  
            console.warn('Looks like there was a problem. Status Code: ' + 
              response.status);
            return;
          }

          // Examine the text in the response  
          response.json().then(function(data) {
            
            //hideLoading()
            var meals = data.Meals;

            let mealsbyTime = meals.filter(function (e) {
                return e.Name == time;
            });

            if (mealsbyTime.length == 0) {
              var nothingDiv = document.getElementById("nothing");

              if (nothingDiv) {
                nothingDiv.className = "text";
              }
              
              var nothingContent = document.createElement("h1");
              nothingContent.innerHTML = "Location closed during selected hours";
              nothingContent.className = "nothingContent";
              nothingContent.style.margin = "20px";
              nothingContent.style.top = "320px";
              
              if (nothingDiv) {
                nothingDiv.appendChild(nothingContent);
              }
              
              console.log(mealsbyTime.length)

              var cage = document.getElementById("numberOfOptions");

              if (cage) {
                cage.innerHTML = "";
              }
              
            } else {
              var nothingDiv = document.getElementById("nothing");

              if (nothingDiv) {
                nothingDiv.innerHTML = "";
              }
              
              var cage = document.getElementById("numberOfOptions");

              if (cage) {
                cage.innerHTML = "";
              }
              
              var counter = 0;
              for (var i = 0; i < mealsbyTime.length; i++) {
                var nested = mealsbyTime[i];
                var stations = nested.Stations;
  
                for (var j = 0; j < stations.length; j++) {
                  var food = stations[j];
                  var items = food.Items;
                  
                  for (var k = 0; k < items.length; k++) {
                    var dishes = items[k];
                    
                    if (dishes.IsVegetarian == false) {
                      continue;
                    } else {
                      counter++;
  
                      const parent = document.getElementById("column");
                  
                      const wrapper = document.createElement("div");
                      wrapper.className = "card";
                      wrapper.style.borderRadius = '10px';
                      wrapper.style.border = '1px solid white';
  
                      const foodName = document.createElement("h3");
                      foodName.textContent = dishes.Name;
                      foodName.className = "foodName";
  
                      var allergens: string[] = [];

                      if ((dishes.Allergens == undefined) || (dishes.Allergens == 0)) {
                        allergens.push("Allergies Unavailable");
                      } else {
                        if (dishes.Allergens[0].Value == true) {
                          allergens.push("Eggs");
                        }
                        
                        if (dishes.Allergens[3].Value == true) {
                          allergens.push("Milk");
                        }

                        if (dishes.Allergens[4].Value == true) {
                          allergens.push("Peanuts");
                        }
  
                        if (dishes.Allergens[7].Value == true) {
                          allergens.push("Tree Nuts");
                        }
                        
                        if (dishes.Allergens[8].Value == true) {
                          allergens.push("Vegetarian");
                        }
                        
                        if (dishes.Allergens[9].Value == true) {
                          allergens.push("Vegan");
                        }
                      }
                      
                      const holder = document.createElement("div");
                      holder.className = "view";
  
                      for (var e = 0; e < allergens.length; e++) {
                        if (allergens[e] == "Eggs") {
                          const icon = document.createElement("img");
                          icon.src = "images/PurdueMenusIcons_Egg.svg";
                          icon.className = "allergy";
  
                          holder.appendChild(icon);
                        }
  
                        if (allergens[e] == "Milk") {
                          const icon = document.createElement("img");
                          icon.src = "images/PurdueMenusIcons_Milk.svg";
                          icon.className = "allergy";
  
                          holder.appendChild(icon);
                        }

                        if (allergens[e] == "Peanuts") {
                          const icon = document.createElement("img");
                          icon.src = "images/PurdueMenusIcons_Peanut.svg";
                          icon.className = "allergy";
  
                          holder.appendChild(icon);
                        }
  
                        if (allergens[e] == "Tree Nuts") {
                          const icon = document.createElement("img");
                          icon.src = "images/PurdueMenusIcons_Treenut.svg";
                          icon.className = "allergy";
  
                          holder.appendChild(icon);
                        }
  
                        if (allergens[e] == "Vegetarian") {
                          const icon = document.createElement("img");
                          icon.src = "images/PurdueMenusIcons_Vegetarian.svg";
                          icon.className = "allergy";
  
                          holder.appendChild(icon);
                        }
  
                        if (allergens[e] == "Vegan") {
                          const icon = document.createElement("img");
                          icon.src = "images/PurdueMenusIcons_Vegan.svg";
                          icon.className = "allergy";
  
                          holder.appendChild(icon);
                        }
  
                        if (allergens[e] == "Allergies Unavailable") {
                          const unavailable = document.createElement("h4");
                          unavailable.textContent = "Allergies Unavailable but Vegetarian or Vegan";
                          unavailable.className = "unv";
  
                          holder.appendChild(unavailable);
                        }
                      }

                      if (parent) {
                        parent.appendChild(wrapper);
                      }
                      
                      wrapper.appendChild(foodName);
                      wrapper.appendChild(holder);
                      
                    }
                  }
                }
              } 
              var cage = document.getElementById("numberOfOptions");

              if (cage) {
                cage.innerHTML = counter + " Available Options";
              }
            }
          });
        }  
      )
      .catch(function(err) {  
        console.error('Fetch Error -', err);  
    });
}