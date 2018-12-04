(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{5371:function(e,t,a){e.exports=a(5606)},5376:function(e,t,a){},5378:function(e,t,a){},5380:function(e,t,a){},5382:function(e,t,a){},5384:function(e,t,a){},5515:function(e,t,a){},5519:function(e,t){},5521:function(e,t){},5556:function(e,t){},5557:function(e,t){},5603:function(e,t,a){},5606:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(29),i=a.n(s),o=(a(5376),a(9)),c=a(10),u=a(12),l=a(11),p=a(13),m=(a(5378),a(28)),h=a.n(m),d=a(44),f=a.n(d),O=a(35),v=(a(5380),a(5382),a(30)),b=a.n(v),E=a(32),C=a.n(E),k=a(31),y=a.n(k),g=a(38),j=a.n(g),I=(a(5384),a(65)),w=a.n(I),V=a(52),M=a.n(V),N=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement(w.a,{className:"ActiveMenuPopover",anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},open:this.props.open},n.a.createElement(O.a,{className:"CloseButton",onClick:this.props.closeMenu}),n.a.createElement("div",{className:"MenuHeader"},n.a.createElement("h1",null,"Menu")),n.a.createElement("div",{className:"ActiveMenu"},n.a.createElement(h.a,{container:!0,direction:"row",justify:"flex",alignItems:"flex",spacing:16},this.props.items.map(function(t){return n.a.createElement(R,{key:t.id,item:t,addItemToCart:e.props.addItemToCart,closeMenu:e.props.closeMenu})}))))}}]),t}(n.a.Component),R=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"passItemToAppCart",value:function(){this.props.addItemToCart(this.props.item)}},{key:"render",value:function(){return n.a.createElement(b.a,{className:"MenuItemCard"},n.a.createElement(y.a,{className:"MenuItemCardContent"},n.a.createElement(C.a,{className:"MenuCardMedia",component:"img",image:this.props.item.image}),n.a.createElement("br",null),this.props.item.name,n.a.createElement("br",null),"$",this.props.item.price,n.a.createElement(j.a,null,n.a.createElement(M.a,{onClick:this.passItemToAppCart.bind(this)},"Order"))))}}]),t}(n.a.Component),S=N,T=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={selectedRestaurant:!1,displayMenu:!1,activeMenu:[]},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){}},{key:"openMenu",value:function(){this.setState({displayMenu:!0,activeMenu:this.props.restaurants[arguments[0]].items})}},{key:"closeMenu",value:function(){this.setState({displayMenu:!1})}},{key:"getRestaurants",value:function(){var e=[];for(var t in this.props.restaurants)e.push(this.props.restaurants[t]);return e}},{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"UserRestaurantViewContainer"},n.a.createElement("h1",null,"Restaurants Near You"),n.a.createElement(h.a,{className:"UserRestaurantViewGrid",container:!0,direction:"row",justify:"center",alignItems:"center",spacing:40},this.getRestaurants().map(function(t){return e.props.selectedRestaurant&&t.id!==e.props.selectedRestaurant?null:n.a.createElement(A,{key:t.id,restaurant:t,openParentMenu:e.openMenu.bind(e,t.id)})}),n.a.createElement(S,{open:this.state.displayMenu,items:this.state.activeMenu,closeMenu:this.closeMenu.bind(this),addItemToCart:this.props.addItemToCart})))}}]),t}(n.a.Component),A=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this))).props=e,a.state={},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"onClick",value:function(){this.props.openParentMenu()}},{key:"render",value:function(){return n.a.createElement(b.a,{className:"RestaurantCard",onClick:this.onClick.bind(this)},n.a.createElement(y.a,{className:"RestaurantCardContent"},this.props.restaurant.name,n.a.createElement("br",null),n.a.createElement(C.a,{className:"RestaurantCardMedia",component:"img",image:this.props.restaurant.image}),n.a.createElement("br",null),this.props.restaurant.description),n.a.createElement(j.a,null))}}]),t}(n.a.Component),F=T,P=(a(5515),a(88)),B=a.n(P),D=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={},console.log("orders:"),console.log(e.orders),a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){}},{key:"getOrderRestaurant",value:function(e){return this.props.restaurants[e.restaurantId]?this.props.restaurants[e.restaurantId]:{}}},{key:"getOrderItems",value:function(e){return[]}},{key:"getOrders",value:function(){var e=[];for(var t in this.props.orders)e.push(this.props.orders[t]);return e}},{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"UserOrderViewContainer"},n.a.createElement("h1",null,"Your Orders"),n.a.createElement(h.a,{className:"UserOrderViewGrid",container:!0,direction:"row",justify:"center",alignItems:"center",spacing:40},this.getOrders().map(function(t){return"pending"===t.state?n.a.createElement(x,{key:t.id,order:t,restaurant:e.getOrderRestaurant(t),items:e.getOrderItems(t)}):n.a.createElement(q,{key:t.id,order:t,restaurant:e.getOrderRestaurant(t),items:e.getOrderItems(t)})})))}}]),t}(n.a.Component),q=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"openItemSummary",value:function(e){}},{key:"hashOrderId",value:function(e){return B.a.createHash("md5").update(e.toString()).digest("hex").substr(0,8)}},{key:"render",value:function(){return console.log(this.props),n.a.createElement(b.a,{className:"FulfilledOrderCard"},n.a.createElement(y.a,{className:"OrderCardContent"},"Order ",this.hashOrderId(this.props.order.id),n.a.createElement("br",null),n.a.createElement(C.a,{className:"OrderCardMedia",component:"img"}),n.a.createElement("br",null),"From ",this.props.restaurant.name,this.props.order.total,n.a.createElement("br",null),this.props.order.state),n.a.createElement(j.a,null))}}]),t}(n.a.Component),x=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"openItemSummary",value:function(e){}},{key:"hashOrderId",value:function(e){return B.a.createHash("md5").update(e.toString()).digest("hex").substr(0,8)}},{key:"render",value:function(){return console.log(this.props),n.a.createElement(b.a,{className:"PendingOrderCard"},n.a.createElement(y.a,{className:"OrderCardContent"},"Order ",this.hashOrderId(this.props.order.id),n.a.createElement("br",null),n.a.createElement(C.a,{className:"OrderCardMedia",component:"img"}),n.a.createElement("br",null),this.props.restaurant.name,n.a.createElement("br",null),this.props.order.createdAt,this.props.order.total,n.a.createElement("br",null),this.props.order.state),n.a.createElement(j.a,null))}}]),t}(n.a.Component),U=D,G=(a(5603),function(e){function t(e){return Object(o.a)(this,t),Object(u.a)(this,Object(l.a)(t).call(this,e))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"calculateTotal",value:function(){var e=0;for(var t in this.props.cartItems)e+=this.props.cartItems[t].price*this.props.cartItems[t].quantity;return e}},{key:"removeItem",value:function(e){this.props.removeItemFromCart(e)}},{key:"getItems",value:function(){var e=[];for(var t in this.props.cartItems)e.push(this.props.cartItems[t]);return e}},{key:"render",value:function(){return n.a.createElement(w.a,{className:"Cart",open:this.props.open},n.a.createElement(f.a,{onClick:this.props.close},n.a.createElement(O.a,null)),n.a.createElement("div",{className:"CartContent"},n.a.createElement(h.a,{className:"CartGrid",container:!0,direction:"column",justify:"left",alignItems:"left",spacing:16},this.getItems().map(function(e){return n.a.createElement(L,{key:e.id,item:e})}),n.a.createElement("br",null)),n.a.createElement("div",{className:"CartTotal"},n.a.createElement("b",null,"Total:")," $",this.calculateTotal(),n.a.createElement("br",null),n.a.createElement(M.a,{className:"CheckoutButton",onClick:this.props.checkout,styles:{}},"Checkout"))))}}]),t}(n.a.Component)),L=function(e){function t(e){return Object(o.a)(this,t),Object(u.a)(this,Object(l.a)(t).call(this,e))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return n.a.createElement(b.a,{className:"CartItem"},n.a.createElement(y.a,null,n.a.createElement(C.a,{className:"CartItemCardMedia",component:"img",image:this.props.item.image}),this.props.item.quantity," ",this.props.item.name,n.a.createElement("br",null),"$",this.props.item.price*this.props.item.quantity))}}]),t}(n.a.Component),W=G,$=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){}},{key:"handleError",value:function(e){this.setState({error:!0})}},{key:"processUser",value:function(e){e.error?this.handleError(e.error):this.setState({user:e})}},{key:"getActiveView",value:function(){return this.props.restaurantViewOpen?this.RestaurantView():this.props.orderViewOpen?this.OrderView():null}},{key:"OrderView",value:function(){return n.a.createElement("div",null,n.a.createElement(U,{user:this.state.user,orders:this.props.orders,restaurants:this.props.restaurants,menus:this.props.menus,open:this.props.orderViewOpen,close:this.props.closeOrderView}),n.a.createElement(W,{open:this.state.cartOpen,close:this.closeCart,cartItems:this.props.cartItems,removeItemFromCart:this.removeItemFromCart}))}},{key:"RestaurantView",value:function(){return n.a.createElement("div",null,n.a.createElement(F,{user:this.state.user,open:this.props.restaurantViewOpen,close:this.props.closeRestaurantView,restaurants:this.props.restaurants,selectedRestaurant:this.props.selectedRestaurant,menus:this.props.menus,addItemToCart:this.props.addItemToCart,closeCart:this.props.closeCart}),n.a.createElement(W,{open:this.props.cartOpen,close:this.props.closeCart,cartItems:this.props.cartItems,removeItemFromCart:this.removeItemFromCart,checkout:this.props.checkout}))}},{key:"render",value:function(){return this.getActiveView()}}]),t}(n.a.Component),H=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={restaurantViewOpen:!1,orderViewOpen:!1,cartItems:{},restaurants:{},selectedRestaurant:!1,menu:{},orders:{}},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){this.getRestaurants(),this.getMenus(),this.getOrders()}},{key:"mutateState",value:function(e,t){var a={};a[e]=t,this.setState(a)}},{key:"openCart",value:function(){this.setState({cartOpen:!0})}},{key:"closeCart",value:function(){this.setState({cartOpen:!1})}},{key:"openRestaurantView",value:function(){this.closeOrderView(),this.setState({restaurantViewOpen:!0})}},{key:"closeRestaurantView",value:function(){this.setState({restaurantViewOpen:!1})}},{key:"openOrderView",value:function(){this.closeRestaurantView(),this.setState({orderViewOpen:!0})}},{key:"closeOrderView",value:function(){this.setState({orderViewOpen:!1})}},{key:"noViewsOpen",value:function(){return!this.state.restaurantViewOpen&&!this.state.orderViewOpen}},{key:"addItemToCart",value:function(e){if(this.state.selectedRestaurant){if(e.restaurantId!==this.state.selectedRestaurant)return!1}else this.setState({selectedRestaurant:e.restaurantId});var t=this.state.cartItems;t[e.id]?t[e.id].quantity++:(t[e.id]=e,t[e.id].quantity=1),this.setState({cart:t})}},{key:"removeItemFromCart",value:function(e){var t=this.state.cartItems;delete t[e],this.setState({cart:t})}},{key:"clearCart",value:function(){this.setState({cartItems:{}})}},{key:"getRestaurants",value:function(){var e=this;fetch("https://cs441-api.herokuapp.com/restaurants").then(function(e){return e.json()}).then(function(t){var a={};t.forEach(function(e){a[e.id]=e}),e.setState({restaurants:a}),console.log("Fetched restaurants from API.")}).catch(function(t){e.setState({error:!0,errorDetails:t})})}},{key:"getMenus",value:function(){var e=this;fetch("https://cs441-api.herokuapp.com/menus").then(function(e){return e.json()}).then(function(t){var a={};t.forEach(function(e){a[e.id]=e}),e.setState({menus:a}),console.log("Fetched menus from API.")}).catch(function(t){e.setState({error:!0,errorDetails:t})})}},{key:"getOrders",value:function(){var e=this;fetch("https://cs441-api.herokuapp.com/orders").then(function(e){return e.json()}).then(function(t){var a={};t.forEach(function(e){a[e.id]=e}),e.setState({orders:a}),console.log("Fetched orders from API.")}).catch(function(t){e.setState({error:!0,errorDetails:t})})}},{key:"checkout",value:function(){var e=this;this.setState({selectedRestaurant:!1}),this.closeCart(),fetch("https://cs441-api.herokuapp.com/orders",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:this.createOrderPOSTBody()}).then(function(t){console.log(e.state.cartItems),e.getOrders(),e.openOrderView(),e.clearCart()})}},{key:"createOrderPOSTBody",value:function(){return JSON.stringify({restaurantId:this.state.selectedRestaurant,items:this.state.cartItems})}},{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement(J,{openRestaurantView:this.openRestaurantView.bind(this),openOrderView:this.openOrderView.bind(this),openCart:this.openCart.bind(this)}),n.a.createElement(h.a,{container:!0,className:"AppGrid"},n.a.createElement("br",null),this.noViewsOpen()?n.a.createElement("div",{className:"LogoContainer"},n.a.createElement("img",{className:"LandingLogo",src:"/foodapp_logo_v3.png",alt:"Foodapp Logo"}),n.a.createElement("h4",null,"All images courtesy of Wikimedia")):"",n.a.createElement($,{restaurants:this.state.restaurants,selectedRestaurant:this.state.selectedRestaurant,menus:this.state.menus,orders:this.state.orders,cartItems:this.state.cartItems,mutateParentState:this.mutateState.bind(this),restaurantViewOpen:this.state.restaurantViewOpen,orderViewOpen:this.state.orderViewOpen,addItemToCart:this.addItemToCart.bind(this),closeCart:this.closeCart.bind(this),removeItemFromCart:this.removeItemFromCart.bind(this),cartOpen:this.state.cartOpen,checkout:this.checkout.bind(this)})))}}]),t}(n.a.Component),J=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return n.a.createElement("nav",{className:"AppNav"},n.a.createElement(f.a,{onClick:this.props.openRestaurantView.bind(this)},n.a.createElement(O.c,null)),n.a.createElement(f.a,{onClick:this.props.openOrderView.bind(this)},n.a.createElement(O.b,null)),n.a.createElement(f.a,{onClick:this.props.openCart.bind(this)},n.a.createElement(O.d,null)))}}]),t}(n.a.Component),z=H;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[5371,2,1]]]);
//# sourceMappingURL=main.375b2041.chunk.js.map