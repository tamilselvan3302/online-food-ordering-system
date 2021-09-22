const firebaseConfig = {
    apiKey: "AIzaSyADoT95ig0pU3YSBQn5xCD7r96fMRYlWDI",
    authDomain: "live-restaurant-order.firebaseapp.com",
    projectId: "live-restaurant-order",
    storageBucket: "live-restaurant-order.appspot.com",
    messagingSenderId: "164826896042",
    appId: "1:164826896042:web:51a60f2ff0825919e0e2d3",
    databaseURL:"https://live-restaurant-order-default-rtdb.firebaseio.com/"
  };
  firebase.initializeApp(firebaseConfig);
  



function ready() {
        var removeCartItemButtons = document.getElementsByClassName('btn-danger')
        for (var i = 0; i < removeCartItemButtons.length; i++) {
            var button = removeCartItemButtons[i];
            button.addEventListener('click',removeCartItem);
        }
        var quantityInputs= document.getElementsByClassName('cart-quantity-input');
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i];
            input.addEventListener('change', quantityChanged)
        }

        var addToCartButtons = document.getElementsByClassName('shop-item-button');
        for (var i = 0; i < addToCartButtons.length; i++) {
            var button = addToCartButtons[i];
            button.addEventListener('click',addToCartClicked)
        }

        document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);

    }
function purchaseClicked()
{
    alert('Thankyou for your purchase');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while(cartItems.hasChildNodes())
    {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();

}

async function removeCartItem(event)
{
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    console.log(buttonClicked.parentElement.getElementsByClassName("rem-btn")[0].innerText);

    let data = await firebase.database().ref('cart/'+user).get();
    var count = data.numChildren();
    console.log(count);

    

    // document.getElementById('Delete').onclick=function()
    //   {
    //       ready();
    //       console.log("delete");
    //       firebase.database().ref('cart/'+user).remove();
    //   }
    updateCartTotal();
}

function quantityChanged(event)
{   
    console.log("hello")
    var input = event.target;
    if(isNaN(input.value) || input.value<=0 )
    {
        input.value=1;
        
    }
    updateCartTotal();
}

function updateCartTotal()
{
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var  cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total=0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow= cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var quantity = parseInt(quantityElement.value);
        var price = parseFloat(priceElement.innerText.replace('$',''));
        total= total+ (price*quantity);
        
    }
    total= Math.round(total*100)/100;
    document.getElementsByClassName('cart-total-price')[0].innerText='$'+ total;
}




function adddetails(nameV, idnoV,priceV,linkV)
{  // idnoV = parseInt(idnoV.replace('I',''));
    document.getElementById("cart-items").innerHTML+=`
    <div class="cart-row">
        <div class="cart-item cart-column">
           <!-- <span class="cart-item-no">${idnoV})</span> -->
            <img class="cart-item-image" src=${linkV} width="100" height="100">
            <span class="cart-item-title">${nameV}</span>
        </div>
        <span class="cart-price cart-column">$${priceV}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="rem-btn btn-danger" type="button">REMOVE ITEM</button>
        </div>
   </div>`

    updateCartTotal();
    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', ready)
        } else {
            ready()
        }

    


}
user ="user1";
function myFunction() {
    

    firebase.database().ref('cart/'+user).once('value',function(snapshot){
        snapshot.forEach(
        function(ChildSnapshot){
        var nameV = ChildSnapshot.val().name;
        var idnoV = ChildSnapshot.val().idno;
        var priceV= ChildSnapshot.val().price;
        var linkV = ChildSnapshot.val().Link;

        adddetails(nameV, idnoV,priceV,linkV);
        
    }
);


    }); 
      

}
window.onload= myFunction();

       
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//     {
    
//        var removeCartItemButtons = document.getElementsByClassName('btn-danger')
//         for (var i = 0; i < removeCartItemButtons.length; i++) {
//             var button = removeCartItemButtons[i];
//             button.addEventListener('click',removeCartItem);
//         }
//         var quantityInputs= document.getElementsByClassName('cart-quantity-input');
//         for (var i = 0; i < quantityInputs.length; i++) {
//             var input = quantityInputs[i];
//             input.addEventListener('change', quantityChanged)
//         }

//         var addToCartButtons = document.getElementsByClassName('shop-item-button');
//         for (var i = 0; i < addToCartButtons.length; i++) {
//             var button = addToCartButtons[i];
//             button.addEventListener('click',addToCartClicked)
//         }

//         document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);

//     }
// function purchaseClicked()
// {
//     alert('Thankyou for your Order');
//     var cartItems = document.getElementsByClassName('cart-items')[0];
//     while(cartItems.hasChildNodes())
//     {
//         cartItems.removeChild(cartItems.firstChild);
//     }
//     updateCartTotal();

// }

// function removeCartItem(event)
// {
//     var buttonClicked = event.target;
//     buttonClicked.parentElement.parentElement.remove();
//     updateCartTotal();
// }

// function quantityChanged(event)
// {
//     var input = event.target;
//     if(isNaN(input.value) || input.value<=0 )
//     {
//         input.value=1;
        
//     }
//     updateCartTotal();
// }

// function addToCartClicked(event)
// {
//     var button = event.target;
//     var shopItem = button.parentElement.parentElement;
//     var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
//     var price = parseFloat(shopItem.getElementsByClassName('shop-item-price')[0].innerText.replace('$',''));
//     var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
//     console.log(title,price,imageSrc);
//     addItemToCart(title,price,imageSrc);
//     updateCartTotal();

// }

// function addItemToCart(title,price,imageSrc)
// {
    

//     var cartItems = document.getElementsByClassName('cart-items')[0];
//     var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
//     for (var i = 0; i < cartItemNames.length; i++) {
//         if(cartItemNames[i].innerText == title)
//         {
//             alert("This item is Already Added")
//             return;
//         }
//     }
    
//     var cartRow = document.createElement('div');
//     cartRow.classList.add('cart-row')
//     var cartRowContents = `<div class="cart-item cart-column">
//                                 <img class="cart-item-image" src=${imageSrc} width="100" height="100">
//                                 <span class="cart-item-title">${title}</span>
//                             </div>
//                             <span class="cart-price cart-column">$${price}</span>
//                             <div class="cart-quantity cart-column">
//                                 <input class="cart-quantity-input" type="number" value="1">
//                                 <button class="btn btn-danger" type="button">REMOVE</button>
//                             </div>`
//     cartRow.innerHTML=cartRowContents
//     cartItems.append(cartRow)   
//     cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
//     cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('click',quantityChanged)













//     // document.getElementsByClassName('cart-items')[0].innerHTML+=`
//     // <div class="cart-row">
//     //     <div class="cart-item cart-column">
//     //         <img class="cart-item-image" src=${imageSrc} width="100" height="100">
//     //         <span class="cart-item-title">${title}</span>
//     //     </div>
//     //     <span class="cart-price cart-column">$${price}</span>
//     //     <div class="cart-quantity cart-column">
//     //         <input class="cart-quantity-input" type="number" value="1">
//     //         <button class="btn btn-danger" type="button">REMOVE</button>
//     //     </div>
//     // </div>`

//     //ready()
// }

// function updateCartTotal()
// {
//     var cartItemContainer = document.getElementsByClassName("cart-items")[0];
//     var  cartRows = cartItemContainer.getElementsByClassName('cart-row');
//     var total=0;
//     for (var i = 0; i < cartRows.length; i++) {
//         var cartRow= cartRows[i];
//         var priceElement = cartRow.getElementsByClassName('cart-price')[0];
//         var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
//         var quantity = parseInt(quantityElement.value);
//         var price = parseFloat(priceElement.innerText.replace('$',''));
//         total= total+ (price*quantity);
        
//     }
//     total= Math.round(total*100)/100;
//     document.getElementsByClassName('cart-total-price')[0].innerText='$'+ total;
// }
