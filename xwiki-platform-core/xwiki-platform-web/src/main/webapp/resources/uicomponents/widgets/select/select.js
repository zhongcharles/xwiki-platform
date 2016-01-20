/*
 * See the NOTICE file distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation; either version 2.1 of
 * the License, or (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this software; if not, write to the Free
 * Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 */
require(['jquery'], function($) {

  /**
   * Represents an XWiki Select Widget.
   * @since 7.4.1
   */
  var xwikiSelectWidget = function(htmlElement) {
    // ----------------------
    // Init fields
    // ----------------------
    var self = this;
    self.selectWidget = $(htmlElement);
    
    /**
     * Send an event to say that the selection have changed
     */
    self.triggerSelectionChange = function () {
      self.selectWidget.trigger('xwiki:select:updated', {'elements': self.selectWidget[0]});
    };

    /**
     * Callback used when an option from the select widget is clicked
     */
    self.onOptionClicked = function () {
      var option = $(this);
      var input = option.find('input');
      if (input.prop('checked')) {
        // The input is already selected, so we have nothing to do, and we do not trigger any event.
        // Note that if the user clicks on the <label> element of the widget, the "click" event is triggered twice:
        // once because of this listener, and then because of the input's state change.
        return;
      }
      input.prop('checked', true);
      self.selectWidget.find('.xwiki-select-option-selected').removeClass('xwiki-select-option-selected');
      option.addClass('xwiki-select-option-selected');
      self.triggerSelectionChange();
    };
    
    /**
    /* Initialization
     */
    self.init = function () {
      self.selectWidget.find('.xwiki-select-option').click(self.onOptionClicked);
    };
    
    /**
     * Clear selection
     */
    self.clearSelection = function () {
      self.selectWidget.find('.xwiki-select-option-selected').removeClass('xwiki-select-option-selected');
      self.selectWidget.find('input[type="radio"]:checked').prop('checked', false);
      self.triggerSelectionChange();
    };

    /**
     * Return the current selected option
     */
    self.getValue = function () {
      return self.selectWidget.find('input[type="radio"]:checked').val();
    };
    
    self.init();
  };
  
  
  /**
   * Define a jQuery plugin about the select widget.
   * @since 7.4.1
   */
  $.fn.xwikiSelectWidget = function(action) {
    //--------------------
    // Handle actions
    //--------------------
    if (!action || action == 'init') {
      // Handle each object separately
      for (var i = 0; i < this.length; ++i) {
        var htmlElement = this[i];
        var selectWidget = new xwikiSelectWidget(htmlElement);
        htmlElement.xwikiSelectWidget = selectWidget;
      }
    } else if (action == 'clearSelection') {
      // Handle each object separately
      for (var i = 0; i < this.length; ++i) {
        this[i].xwikiSelectWidget.clearSelection();
      }
    } else if (action == 'getValue') {
      // In such a case, there is no possible chaining
      return this[0].xwikiSelectWidget.getValue();
    }
    
    // Enable chaining
    return this;
  };
  
  /**
   * Initializer called when the DOM is ready
   */
  var init = function() {
    // Register a callback when an option is clicked
    $('.xwiki-select').xwikiSelectWidget();
  };

  $(window).ready(init);
});



