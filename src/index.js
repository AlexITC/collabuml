import _ from 'lodash';
import './style.css';
import '../node_modules/bootswatch/dist/flatly/bootstrap.min.css';
import jQuery from 'jquery';
import { collabuml } from './config';
import { getText, renderPad } from './etherpad-editor';
import { scheduledRendering } from './plantuml-rendered';

jQuery(function () {
    renderPad('#etherpad-input', collabuml.padId);
    jQuery('#session-name').append('Session: ' + collabuml.padId);
    scheduledRendering(2000, getText);
});
