import jQuery from 'jquery';
import { collabuml } from './config';

export const getText = (callback) => {
    jQuery.ajax({
        'url': collabuml.host + '/api/1/getText?apikey=' + collabuml.apikey + '&padID=' + collabuml.padId + '&jsonp=?',
        'type': 'GET',
        'dataType': "jsonp",
        'success': function (response) {
            callback(response.data.text);
        }
    });
};

export const renderPad = (selector, padId) => {
    jQuery(selector).pad({ 'padId': padId, 'showChat': 'false' });
};

(function (jQuery) {
    jQuery.fn.pad = function (options) {
        var settings = {
            'host': collabuml.host,
            'baseUrl': '/p/',
            'showControls': false,
            'showChat': false,
            'showLineNumbers': true,
            'userName': collabuml.userName,
            'lang': '',
            'useMonospaceFont': false,
            'noColors': false,
            'userColor': false,
            'hideQRCode': false,
            'alwaysShowChat': false,
            'width': 100,
            'height': 300,
            'border': 1,
            'borderStyle': 'solid',
            'toggleTextOn': 'Disable Rich-text',
            'toggleTextOff': 'Enable Rich-text',
            'plugins': {},
            'rtl': false
        };
        var $self = this;
        if (!$self.length) return;
        if (!$self.attr('id')) throw new Error('No "id" attribute');

        var useValue = $self[0].tagName.toLowerCase() == 'textarea';
        var selfId = $self.attr('id');
        var epframeId = 'epframe' + selfId;
        // This writes a new frame if required
        if (options) {
            jQuery.extend(settings, options);
        }

        var pluginParams = '';
        for (var option in settings.plugins) {
            pluginParams += '&' + option + '=' + settings.plugins[option]
        }

        var iFrameLink = '<iframe id="' + epframeId;
        iFrameLink = iFrameLink + '" name="' + epframeId;
        iFrameLink = iFrameLink + '" src="' + settings.host + settings.baseUrl + settings.padId;
        iFrameLink = iFrameLink + '?showControls=' + settings.showControls;
        iFrameLink = iFrameLink + '&showChat=' + settings.showChat;
        iFrameLink = iFrameLink + '&showLineNumbers=' + settings.showLineNumbers;
        iFrameLink = iFrameLink + '&useMonospaceFont=' + settings.useMonospaceFont;
        iFrameLink = iFrameLink + '&userName=' + settings.userName;
        if (settings.lang) {
            iFrameLink = iFrameLink + '&lang=' + settings.lang;
        }
        iFrameLink = iFrameLink + '&noColors=' + settings.noColors;
        iFrameLink = iFrameLink + '&userColor=' + settings.userColor;
        iFrameLink = iFrameLink + '&hideQRCode=' + settings.hideQRCode;
        iFrameLink = iFrameLink + '&alwaysShowChat=' + settings.alwaysShowChat;
        iFrameLink = iFrameLink + '&rtl=' + settings.rtl;
        iFrameLink = iFrameLink + pluginParams;
        iFrameLink = iFrameLink + '" style="border:' + settings.border;
        iFrameLink = iFrameLink + '; border-style:' + settings.borderStyle;
        iFrameLink = iFrameLink + ';" width="' + '100%';//settings.width;
        iFrameLink = iFrameLink + '" height="' + settings.height;
        iFrameLink = iFrameLink + '"></iframe>';


        var $iFrameLink = jQuery(iFrameLink);

        if (useValue) {
            var $toggleLink = jQuery('<a href="#' + selfId + '">' + settings.toggleTextOn + '</a>').click(function () {
                var $this = jQuery(this);
                $this.toggleClass('active');
                if ($this.hasClass('active')) $this.text(settings.toggleTextOff);
                $self.pad({ getContents: true });
                return false;
            });
            $self
                .hide()
                .after($toggleLink)
                .after($iFrameLink)
                ;
        }
        else {
            $self.html(iFrameLink);
        }

        return $self;
    };
})(jQuery);

