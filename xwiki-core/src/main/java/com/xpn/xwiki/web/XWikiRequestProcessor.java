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
 *
 */

package com.xpn.xwiki.web;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;

public class XWikiRequestProcessor extends org.apache.struts.action.RequestProcessor
{
    protected String processPath(HttpServletRequest httpServletRequest,
        HttpServletResponse httpServletResponse) throws IOException
    {
        String result = super.processPath(httpServletRequest, httpServletResponse);

        // Remove /wikiname/ part if the struts action is /wiki/
        if (httpServletRequest.getServletPath().equals("/wiki")) {
            result = result.substring(result.indexOf("/", 1));
        }

        if (StringUtils.countMatches(result, "/") <= 2) {
            if (result.startsWith("/xmlrpc/")) {
                return "/xmlrpc/";
            } else {
                return "/view/";
            }
        } else {
            return result.substring(0, result.indexOf("/", 1) + 1);
        }
    }
}
