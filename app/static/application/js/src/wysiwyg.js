/**
 * --------------------------------------------------------------------------
 * Ace (v2.1.4): wysiwyg.js
   Wrapper for Bootstrap wyswiwyg plugin
*/

import $ from 'jquery'
import bootstrap from 'bootstrap'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'aceWysiwyg'
const VERSION = '2.1.4'
const DATA_KEY = 'ace.wysiwyg'

const DefaultType = {
  wysiwyg: 'object',
  colors: 'array',
  // speech: 'boolean',
  toolbar: 'array',
  toolbarPlacement: '(function|null)',
  toolbarStyle: '(string|number)'
}

const Default = {
  wysiwyg: {},
  // speech: true,
  toolbarPlacement: null,
  toolbarStyle: '',

  colors: ['#ac725e', '#d06b64', '#f83a22', '#fa573c', '#ff7537', '#ffad46',
    '#42d692', '#16a765', '#7bd148', '#b3dc6c', '#fbe983', '#fad165',
    '#92e1c0', '#9fe1e7', '#9fc6e7', '#4986e7', '#9a9cff', '#b99aff',
    '#c2c2c2', '#cabdbf', '#cca6ac', '#f691b2', '#cd74e6', '#a47ae2',
    '#444444'],
  toolbar: ['font', null, 'fontSize', null, 'bold', 'italic', 'strikethrough', 'underline', null, 'insertunorderedlist', 'insertorderedlist',
    'outdent', 'indent', null, 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', null, 'createLink', 'unlink', null,
    'insertImage', null, 'foreColor', null, 'undo', 'redo', null, 'viewSource']
}

class Wysiwyg {
  constructor (element, config) {
    this._element	= element
    this._config = this._getConfig(config)

    this.initEditor()
  }

  static get VERSION () {
    return VERSION
  }

  static get DefaultType () {
    return DefaultType
  }

  static get Default () {
    return Default
  }

  initEditor () {
    var toolbarHtml = this._createToolbarHtml()
    var toolbar
    // if we have a function to decide where to put the toolbar, then call that
    if (this._config.toolbarPlacement) toolbar = this._config.toolbarPlacement.call(this._element, toolbarHtml)
    else toolbar = $(this._element).before(toolbarHtml).prev()// otherwise put it just before our DIV

    if (this._config.toolbarStyle) toolbar.addClass('bsw-toolbar-style-' + this._config.toolbarStyle)

    // enable tooltips
    if ($.fn.tooltip) toolbar.find('a[title]').tooltip({ animation: false, container: 'body' })

    toolbar.find('.dropdown-menu input[type=text]').on('click', function () { return false })
      .on('change', function () { $(this).closest('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle') })
      .on('keydown', function (e) {
        if (e.which === 27) {
          this.value = ''
          $(this).change()
        } else if (e.which === 13) {
          e.preventDefault()
          e.stopPropagation()
          $(this).change()
        }
      })

    toolbar.find('input[type=file]').prev().on('click', function (e) {
      $(this).next().click()
    })

    var self = $(this._element)
    // view source
    var viewSource = false
    toolbar.find('a[data-toggle=source]').on('click', function (e) {
      e.preventDefault()

      if (!viewSource) {
        $('<textarea />')
          .css({ width: self.outerWidth(), height: self.outerHeight() })
          .val(self.html())
          .insertAfter(self)
        self.addClass('d-none')

        $(this).addClass('active')
      } else {
        var textarea = self.next()
        self.html(textarea.val()).removeClass('d-none')
        textarea.remove()

        $(this).removeClass('active')
      }

      viewSource = !viewSource
    })

    // initiate wysiwyg plugin
    var $options = $.extend({}, { activeToolbarClass: 'active', toolbarSelector: toolbar }, this._config.wysiwyg || {})
    $(this._element).wysiwyg($options)

    this._handleImages()
  }

  _createToolbarHtml () {
    var _buttonDefaults =	{
      font: {
        values: ['Arial', 'Courier', 'Comic Sans MS', 'Helvetica', 'Open Sans', 'Tahoma', 'Verdana'],
        icon: 'fa fa-font text-secondary-m1',
        title: 'Font'
      },
      fontSize: {
        values: { 5: 'Huge', 3: 'Normal', 1: 'Small' },
        icon: 'fa fa-text-height text-secondary-m1',
        title: 'Font Size'
      },
      bold: {
        icon: 'fa fa-bold text-secondary-m1',
        title: 'Bold (Ctrl/Cmd+B)'
      },
      italic: {
        icon: 'fa fa-italic text-secondary-m1',
        title: 'Italic (Ctrl/Cmd+I)'
      },
      strikethrough: {
        icon: 'fa fa-strikethrough text-secondary-m1',
        title: 'Strikethrough'
      },
      underline: {
        icon: 'fa fa-underline text-secondary-m1',
        title: 'Underline'
      },
      insertunorderedlist: {
        icon: 'fa fa-list-ul text-secondary-m1',
        title: 'Bullet list'
      },
      insertorderedlist: {
        icon: 'fa fa-list-ol text-secondary-m1',
        title: 'Number list'
      },
      outdent: {
        icon: 'fa fa-outdent text-secondary-m1',
        title: 'Reduce indent (Shift+Tab)'
      },
      indent: {
        icon: 'fa fa-indent text-secondary-m1',
        title: 'Indent (Tab)'
      },
      justifyleft: {
        icon: 'fa fa-align-left text-secondary-m1',
        title: 'Align Left (Ctrl/Cmd+L)'
      },
      justifycenter: {
        icon: 'fa fa-align-center text-secondary-m1',
        title: 'Center (Ctrl/Cmd+E)'
      },
      justifyright: {
        icon: 'fa fa-align-right text-secondary-m1',
        title: 'Align Right (Ctrl/Cmd+R)'
      },
      justifyfull: {
        icon: 'fa fa-align-justify text-secondary-m1',
        title: 'Justify (Ctrl/Cmd+J)'
      },
      createLink: {
        icon: 'fa fa-link text-secondary-m1',
        title: 'Hyperlink',
        button_text: 'Add',
        placeholder: 'URL',
        button_class: 'btn-primary'
      },
      unlink: {
        icon: 'fa fa-unlink text-secondary-m1',
        title: 'Remove Hyperlink'
      },
      insertImage: {
        icon: 'fa fa-image text-secondary-m1',
        title: 'Insert picture',
        button_text: '<i class="fa fa-file mr-1"></i> Choose an Image &hellip;',
        placeholder: 'Remote Image URL',
        button_insert: 'Insert',
        button_class: 'btn-success',
        button_insert_class: 'btn-primary',
        choose_file: true // show the choose file button?
      },
      foreColor: {
        icon: 'fas fa-eye-dropper text-pink-m2',
        values: this._config.colors,
        title: 'Foreground Color'
      },
      backColor: {
        icon: 'fas fa-fill-drip text-secondary-m1',
        values: this._config.colors,
        title: 'Background Color'
      },
      undo: {
        icon: 'fa fa-undo text-secondary-m1',
        title: 'Undo (Ctrl/Cmd+Z)'
      },
      redo: {
        icon: 'fa fa-redo text-secondary-m1',
        title: 'Redo (Ctrl/Cmd+Y)'
      },
      viewSource: {
        icon: 'fa fa-code text-secondary-m1',
        title: 'View Source'
      }
    }

    const toolbarButtons = this._config.toolbar
    let toolbarHtml = ' <div class="bootstrap-wysiwyg-toolbar btn-toolbar text-center"> <div class="btn-group"> '

    for (var tb in toolbarButtons) {
      if (Object.prototype.hasOwnProperty.call(toolbarButtons, tb)) {
        var button = toolbarButtons[tb]
        if (button === null) {
          toolbarHtml += ' </div> <div class="btn-group"> '
          continue
        }

        if (typeof button === 'string' && button in _buttonDefaults) {
          button = _buttonDefaults[button]
          button.name = toolbarButtons[tb]
        } else if (typeof button === 'object' && button.name in _buttonDefaults) {
          button = $.extend(_buttonDefaults[button.name], button)
        } else continue

        var className = 'className' in button ? button.className : 'my-2px btn-sm btn-outline-secondary btn-h-outline-primary btn-a-light-primary'
        switch (button.name) {
          case 'font':
            toolbarHtml += ` <a class="btn btn-sm ${className} dropdown-toggle" data-toggle="dropdown" title="${button.title}"><i class="${button.icon}">${button.iconText || ''}</i><i class="fa fa-angle-down ml-1 text-secondary-m2"></i></a> `
            toolbarHtml += ' <div class="dropdown-menu">'
            for (var font in button.values) {
              if (Object.prototype.hasOwnProperty.call(button.values, font)) {
                toolbarHtml += ` <div class="dropdown-item"><a data-edit="fontName ${button.values[font]}" style="font-family:'${button.values[font]}'">${button.values[font]}</a></div> `
              }
            }
            toolbarHtml += ' </div>'
            break

          case 'fontSize':
            toolbarHtml += ` <a class="btn btn-sm ${className} dropdown-toggle" data-toggle="dropdown" title="${button.title}"><i class="${button.icon}">${button.iconText || ''}</i>&nbsp;<i class="fa fa-angle-down ml-1 text-secondary-m2"></i></a> `
            toolbarHtml += ' <div class="dropdown-menu"> '
            for (var size in button.values) {
              if (Object.prototype.hasOwnProperty.call(button.values, size)) {
                toolbarHtml += ` <div class="dropdown-item"><a data-edit="fontSize ${size}"><font size="${size}">${button.values[size]}</font></a></div> `
              }
            }
            toolbarHtml += ' </div> '
            break

          case 'createLink':
            toolbarHtml += ` <div class="btn-group"> <a class="btn btn-sm ${className} dropdown-toggle" data-toggle="dropdown" title="${button.title}"><i class="${button.icon}">${button.iconText || ''}</i></a> `
            toolbarHtml += ` <div class="dropdown-menu py-1 px-3 brc-primary-tp2 border-2" style="min-width: 300px;">
						 <div class="input-group my-3">
							<input class="form-control" placeholder="${button.placeholder}" type="text" data-edit="${button.name}" />
							<div class="input-group-append">
								<button class="btn btn-sm ${button.button_class}" type="button">${button.button_text}</button>
							</div>
						 </div>
					</div> </div>`
            break

          case 'insertImage':
            toolbarHtml += ` <div class="btn-group"> <a class="btn btn-sm ${className} dropdown-toggle" data-toggle="dropdown" title="${button.title}"><i class="${button.icon}">${button.iconText || ''}</i></a> `
            toolbarHtml += ' <div class="dropdown-menu p-3 brc-primary-tp2 border-2" style="min-width: 300px;">'
            if (button.choose_file && 'FileReader' in window) {
              toolbarHtml +=
              `<div class="text-muted">Drag &amp; drop images into editor or</div>
						   <label class="text-center d-block mt-2 mb-0">
							<button class="btn btn-sm ${button.button_class} wysiwyg-choose-file" type="button">${button.button_text}</button>
							<input type="file" class="file-input-invisible" data-edit="${button.name}" />
						   </label><hr /> `
            }

            toolbarHtml += `<div class="input-group my-3">
							<input class="form-control" placeholder="${button.placeholder}" type="text" data-edit="${button.name}" />
							<div class="input-group-append">
								<button class="btn btn-sm ${button.button_insert_class}" type="button">${button.button_insert}</button>
							</div>
						 </div>`
            toolbarHtml += ' </div> </div>'

            break

          case 'foreColor':
          case 'backColor':
            toolbarHtml += `<div class="mr-1px"><a class="btn btn-sm ${className} dropdown-toggle" data-toggle="dropdown" title="${button.title}"><i class="${button.icon}">${button.iconText || ''}</i></a> `
            toolbarHtml += ' <div class="dropdown-menu p-1 brc-primary-tp2 border-1" style="min-width:auto; width:128px;">'
            for (var color in button.values) {
              if (Object.prototype.hasOwnProperty.call(button.values, color)) {
                toolbarHtml += ` <div class="dropdown-item p-0 d-inline-block w-auto"><a class="p-0" data-edit="${button.name} ${button.values[color]}" style="cursor:pointer;width:1.25rem;height:1.25rem;background-color:${button.values[color]};"></a></div> `
              }
            }
            toolbarHtml += ' </div></div>'
            break

          case 'viewSource':
            toolbarHtml += ` <a class="btn btn-sm ${className}" data-toggle="source" title="${button.title}"><i class="${button.icon}">${button.iconText || ''}</i></a> `
            break
          default:
            toolbarHtml += ` <a class="btn btn-sm ${className}" data-edit="${button.name}" title="${button.title}"><i class="${button.icon}">${button.iconText || ''}</i></a> `
            break
        }
      }
    }
    toolbarHtml += ' </div> '// for .btn-group

    // var speech_input;
    // if (this._config.speech && 'onwebkitspeechchange' in (speech_input = document.createElement('input'))) {
    // toolbarHtml += ' <input class="wysiwyg-speech-input" type="text" data-edit="inserttext" x-webkit-speech />';
    // }
    // speech_input = null;
    /// /////////
    toolbarHtml += ' </div> '// for .btn-toolbar

    return toolbarHtml
  }

  _handleImages () {
    // option for resizing an image
    var currentImg = null
    $(this._element).on('click', 'img', function (ev) {
      if (currentImg) $(currentImg).popover('dispose')

      currentImg = this
      if (!$(currentImg).data('original-width')) $(currentImg).data('original-width', currentImg.width)

      $(currentImg).popover({
        container: 'body',
        html: true,
        placement: function (popover) {
          var offset = currentImg.getBoundingClientRect()
          var scrollTop = document.scrollTop || document.documentElement.scrollTop || document.body.scrollTop
          $(popover).addClass('popover-wysiwyg-image shadow brc-secondary-m4').css({ 'margin-left': (offset.left + 4) + 'px', 'margin-top': (offset.top + scrollTop + 4) + 'px' })

          return 'auto'
        },
        title: 'Image Size & Position',
        trigger: 'manual',
        content: function () {
          return $(`<div class='btn-group'>
								<button type='button' class='btn btn-xs btn-outline-default' data-action='resize' data-value='0.25'>25%</button>
								<button type='button' class='btn btn-xs btn-outline-default' data-action='resize' data-value='0.50'>50%</button>
								<button type='button' class='btn btn-xs btn-outline-default' data-action='resize' data-value='1'>100%</button>
							  </div>
							  <input type='number' class='form-control d-inline-block form-control-sm' data-action='resize' style='max-width: 96px;' placeholder='specify width' value='${currentImg.width}' />
							  <hr class='my-2' />
							  <div class='btn-group'>
								<button type='button' class='btn btn-xs btn-outline-secondary' data-action='align' data-value='left'>left</button>
								<button type='button' class='btn btn-xs btn-outline-secondary' data-action='align' data-value='right'>right</button>
								<button type='button' class='btn btn-xs btn-outline-secondary' data-action='align' data-value='none'>none</button>
							 </div>
							 <div class='btn-group float-right'>
								<button type='button' tooltip='Remove image' class='btn btn-sm btn-outline-warning btn-h-outline-danger btn-a-light-danger btn-bold radius-round' data-action='remove'><i class='fa fa-trash text-red'></i></button>
							 </div>`)
        }
      }).popover('show')

      $(document).on('click.popover-wysiwyg-image', function (ev) {
        if (ev.target === currentImg) return

        if ($(ev.target).closest('.popover-wysiwyg-image').length > 0) {
          return
        }

        if (currentImg) $(currentImg).popover('hide')

        currentImg = null
        $(document).off('click.popover-wysiwyg-image')
      })
    })

    $(document).on('click', '.popover-wysiwyg-image button.btn', function () {
      if (!currentImg) return
      var action = $(this).data('action')
      var value = $(this).data('value')

      if (action === 'resize') {
        var width = parseInt($(currentImg).data('original-width') * value)
        $(currentImg).css({ width: width })
        $('.popover-wysiwyg-image input[type=number]').val(width)
      }
      if (action === 'align') $(currentImg).attr('class', 'float-' + value)
      else if (action === 'remove') {
        $(currentImg).popover('dispose').remove()// fadeOut(200, function() { $(this).remove() });
        currentImg = null
      }
    })

    $(document).on('change', '.popover-wysiwyg-image input[type=number]', function () {
      if (currentImg) $(currentImg).css({ width: $(this).val() + 'px' })
    })
    /// //////////////
  }

  _getConfig (config) {
    config = {
      ...Default,
      ...typeof config === 'object' && config ? config : {}
    }

    if (typeof bootstrap !== 'undefined') {
      bootstrap.Util.typeCheckConfig(
        NAME,
        config,
        this.constructor.DefaultType
      )
    }

    return config
  }

  // Static methods
  static _jQueryInterface (config) {
    return this.each(function () {
      const $this = $(this)
      let data = $this.data(DATA_KEY)
      const _config = {
        ...Default,
        ...$this.data(),
        ...typeof config === 'object' && config ? config : {}
      }

      if (!data) {
        data = new Wysiwyg(this, _config)
        $this.data(DATA_KEY, data)
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`)
        }
        data[config]()
      }
    })
  }
}

if (typeof $ !== 'undefined') {
  const JQUERY_NO_CONFLICT = $.fn[NAME]
  $.fn[NAME] = Wysiwyg._jQueryInterface
  $.fn[NAME].Constructor = Wysiwyg
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Wysiwyg._jQueryInterface
  }
}

export default Wysiwyg
