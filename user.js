// ==UserScript==
// @name        Neptune
// @namespace   Violentmonkey Scripts
// @include        https://*neptun*/*hallgato*/*
// @include        https://*neptun*/*Hallgatoi*/*
// @include        https://*neptun*/*oktato*/*
// @include        https://*hallgato*.*neptun*/*
// @include        https://*oktato*.*neptun*/*
// @include        https://netw*.nnet.sze.hu/hallgato/*
// @include        https://nappw.dfad.duf.hu/hallgato/*
// @include        https://host.sdakft.hu/*
// @include        https://neptun.ejf.hu/ejfhw/*
// @grant       none
// @version     2.0
// @author      --
// @description 11/24/2020, 3:09:00 PM
// ==/UserScript==

var $ = window.jQuery;
var ChooseBase = window.dochangeSkin;
var cssElement = document.createElement("link");
cssElement.rel = "stylesheet";
cssElement.type = "text/css";
cssElement.href = "";

window.CountDown = start;

function showHideThemeChooser() {

	var col = $('.skinchooserimgcollapsed')

    if (col != null) {
        var cho = $('.skinchooserimg')
        cho.width("20px");
        cho.animate({ height: "0px" }, 300);
        cho.animate({ height: "20px" }, 150);
        col.toggleClass("skinchooserimgcollapsed skinchooserimgexpanded", 300);
    }
    else {
        $('.skinchooserimgexpanded').toggleClass("skinchooserimgexpanded skinchooserimgcollapsed", 300);
    }

    state = !state;
    SetAriaHiddenAttributeToSkinChooserImages(state);
}

function init()
{

    //Theme chooser fix
    window.ShowHideThemeChooser = showHideThemeChooser;

    var skinchooserimg_blue = $('.skinchooserimg_blue');
    var skinchooserimg_green = $('.skinchooserimg_green');
    var skinchooserimg_pink = $('.skinchooserimg_pink');
    var skinchooserimg_orange = $('.skinchooserimg_orange');
    var skinchooserimg_teacher = $('.skinchooserimg_teacher');
    var skinchooserimg_purple = $('.skinchooserimg_purple');
    var skinchooserimg_szte = $('.skinchooserimg_szte');

    setSkinImageUrl();

    skinchooserimg_blue.bind('mouseover', { skinName: 'Blue' }, showSkinPreview);
    skinchooserimg_green.bind('mouseover', { skinName: 'Green' }, showSkinPreview);
    skinchooserimg_pink.bind('mouseover', { skinName: 'Pink' }, showSkinPreview);
    skinchooserimg_orange.bind('mouseover', { skinName: 'Orange' }, showSkinPreview);
    skinchooserimg_teacher.bind('mouseover', { skinName: 'Teacher' }, showSkinPreview);
    skinchooserimg_purple.bind('mouseover', { skinName: 'Purple' }, showSkinPreview);
    skinchooserimg_szte.bind('mouseover', { skinName: 'SZTE' }, showSkinPreview);

    skinchooserimg_blue.bind('mouseout', { skinName: 'Blue' }, hideSkinPreview);
    skinchooserimg_green.bind('mouseout', { skinName: 'Green' }, hideSkinPreview);
    skinchooserimg_pink.bind('mouseout', { skinName: 'Pink' }, hideSkinPreview);
    skinchooserimg_orange.bind('mouseout', { skinName: 'Orange' }, hideSkinPreview);
    skinchooserimg_teacher.bind('mouseout', { skinName: 'Teacher' }, hideSkinPreview);
    skinchooserimg_purple.bind('mouseout', { skinName: 'Purple' }, hideSkinPreview);
    skinchooserimg_szte.bind('mouseout', { skinName: 'SZTE' }, hideSkinPreview);

    //Footer addition
    var footer = $('.footer')[0];

    var logo = footer.children[footer.children.length - 2];
    var PTLogo = document.createElement('td');
    PTLogo.classList = ['footer_sda_logo'];

    console.log(PTLogo);

    logo.insertAdjacentHTML('afterend', PTLogo);

}

window.dochangeSkin = function(href, skin)
{

	if(!((String)(skin)).startsWith("Skin_Neptun_Anime"))
	{
        window.localStorage.setItem('CustomSkin',null);
        return ChooseBase(href, skin)
    }

    var ls = skin.split('_');
    var skinName = ls[ls.length - 1];

    window.localStorage.setItem('CustomSkin',skinName);

    selectSkin(skinName)

}

function selectSkin(skinName)
{
    if(skinName === "Anime1")
    {
        cssElement.href = "https://gitcdn.link/cdn/Balint66/NeptunSkins/7007c7558501da9ca52dc1b50310682955083a7f/Neptune/main.css?v=1";
    }
}

function createButton({name='', alt=null})
{
    var neptune = document.createElement("input");
    neptune.type = "image";
    neptune.name = "btnskin" + name;
    neptune.id = "btnskin" + name;
    neptune.tabIndex = 7;
    neptune.classList = ["skinchooserimg"];
    neptune.onblur = function(event){};
    neptune.onfocus = function(event){};
    neptune.src = "App_Themes/New_Common_Images/skin_pink_new.png";
    neptune.alt = alt || "Anime";
    neptune.style = "height: 20px; margin-bottom: 5px; cursor: pointer; width: 20px;"
    neptune.setAttribute("aria-hidden", "false");
    neptune.onclick = function(event){
        javascript: SkinChoose('Skin_Neptun_'+name);
        return false;
    }
    neptune.onmouseover = window.showSkinPreview.bind(neptune, { data: {skinName: name}});
    neptune.onmouseout = window.hideSkinPreview.bind(neptune, { data: {skinName: name}});
    return neptune;
}

function addPreviewsto({parent, alt, name='',src=''})
{
    var labelNeptune = document.createElement("label");
    labelNeptune.classList = ["hiddenforlabel"];
    labelNeptune.setAttribute("for", "image"+name);
    labelNeptune.innerHTML = alt || "Neptune";

    parent.appendChild(labelNeptune);

    var neptunePreview = document.createElement("input");
    neptunePreview.type = "image";
    neptunePreview.alt = alt || "Neptune";
    neptunePreview.id = "image"+name;
    neptunePreview.style = "display: none;"
    neptunePreview.src = src;
    neptunePreview.height = 60;
    parent.appendChild(neptunePreview);
}

function start() {

    var h = document.querySelector('head');

    h.appendChild(cssElement);

    if( window.localStorage.getItem('CustomSkin') !== 'null')
    {
		selectSkin(window.localStorage.getItem('CustomSkin'));
    }

    init();

    var skinChooser = ( document.getElementsByClassName("skinchooserimgcollapsed") || document.getElementsByClassName("skinchooserimgexpanded") )[0];

    skinChooser.children[0].appendChild(createButton({name: "Anime1"}));

    var previewColl = document.getElementsByClassName("skinsmallimage")[0];

    addPreviewsto({parent: previewColl, name:"Anime1", src:"https://i.imgur.com/2HVmKTd.png"})


}

//window.addEventListener('load', false);