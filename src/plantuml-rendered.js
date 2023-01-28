import jQuery from 'jquery';

const plantumlEncoder = require('plantuml-encoder')

function renderDiagram(ms, getText) {
    scheduledRendering(ms, getText);
    getText(function (text) {
        var encoded = plantumlEncoder.encode(text);
        var div = jQuery('#diagram-view')
        var sourceUrl = "https://www.plantuml.com/plantuml/img/" + encoded;
        var item = '<img src="' + sourceUrl + '">'
        div.html('');
        div.append(item);
    });
}

var scheduled = null;
export const scheduledRendering = (ms, getText) => {
    if (scheduled) {
        clearTimeout(scheduled);
    }
    scheduled = setTimeout(() => renderDiagram(ms, getText), ms);
};
