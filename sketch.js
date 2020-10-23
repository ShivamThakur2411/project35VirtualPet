var dog, dogI, dogHappy;
var foodS, foodStock, foodSRef;
var getFoodStockRef;
var database;
var x = 80;
var y = 100;
var y2= 300;
var fedTime, lastFed;
var foodObj, milkImg, plainImg;
var buttonFeed, buttonAdd;
var button, input;

function preload(){
	dogI = loadImage("Dog.png");
	dogHappy = loadImage("happyDog2.png");
	milkImg = loadImage("milk.png");
	plainImg = loadImage("milk plain.png");
}

function setup() {
	createCanvas(800, 600);
	 database = firebase.database();

	dog = createSprite(690,250);
	dog.scale = 0.15;
	dog.addImage("dogI", dogI);
	dog.addImage("happyDog", dogHappy);

	nameSetup();
	
	foodObj = new Food();

	fedtime = database.ref('FeedTime');
	fedtime.on("value",(data)=>{
		lastFed = data.val();
	}) 
	getFoodStockRef = database.ref('Food');
		getFoodStockRef.on("value",(data)=>{
		foodS = data.val();
		foodObj.updateFoodStock(foodS);
	}) 
}

function draw() {  
	background("red");
		//image(milkImg, 200, 200, 50, 50);

		fill(255,255,254);
		textSize(15);
		if(lastFed>=12){
			text("last Fed : " + lastFed%12 + "PM",200, 30);
		}else if(lastFed === 0){
			text("Last Fed : 12 AM", 200, 30);
		}else{
			text("Last Fed : " + lastFed + " AM", 200, 30);
		}


	feed = createButton("FEED THE DOG");
	feed.position(730, 66);
	feed.mousePressed(feedDog);

	addFood = createButton("ADD FOOD");
	addFood.position(450, 66);
	addFood.mousePressed(addFoods);

		if(keyCode === 32){
			textSize(30);
			text("DON'T LET IT BE HUNGRY", 50, 250);
	}

	foodObj.display();

  drawSprites();
}
function feedDog(){
	dog.changeImage("happyDog", dogHappy);
		foodObj.updateFoodStock(foodObj.getFoodStock()-1);
	database.ref('/').update({
		Food: foodObj.getFoodStock(),
		FeedTime: hour()
	})
}

function addFoods(){
	//dog.changeImage("dogI", dogI);
	foodS++;
	database.ref('/').update({
		Food: foodS
	})

}

//the function for naming the dog;
function nameSetup(){
	var input = createInput("NAME THE PET");
	input.position(450, 100);
}
