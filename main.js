const electron=require('electron');
const url=require('url');
const path=require('path');

const{app, BrowserWindow, Menu}=electron;

///// set production window ////
process.env.NODE_ENV='development';

///declare windows///
let mainWindow;
let addWindow;

////// create main window ///
app.on('ready',function(){
mainWindow=new BrowserWindow({
    width: 1024,
    height: 750,
});

mainWindow.loadURL(url.format({
pathname:path.join(__dirname + '/index.html'),
protocol :'file:',
slashes:true
}));

/// close all   
    mainWindow.on('closed', function () {
        app.quit();
    });
//// preparing menu template //
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
    
});

////////////////////// create add window //////////////
function addWindows(){
    addWindow = new BrowserWindow({
        width: 600,
        height: 600,
    });

    addWindow.loadURL(url.format({
        pathname: path.join(__dirname + '/add.html'),
        protocol: 'file:',
        slashes: true
    }));

}

//// menu shift 
// If OSX, add empty object to menu
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

//// create menu template
const mainMenuTemplate=[
{
label:'Settings',
submenu :[
{
    label:'Open Entry Form',
    click(){
        addWindows();
    }
},
    {
        label: 'Delete  All Entry'
    }
    ]
},
{
label: 'Exit',
submenu:[
    {
        label: 'Exit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){ app.quit();}
    }

]
}

];
