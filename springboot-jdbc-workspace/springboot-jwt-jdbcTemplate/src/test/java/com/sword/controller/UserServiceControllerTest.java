package com.sword.controller;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.sword.AbstractTest;
import com.sword.config.TokenProvider;
import com.sword.model.User;

public class UserServiceControllerTest extends AbstractTest {
	
	 @Autowired
	    private AuthenticationManager authenticationManager;

	    @Autowired
	    private TokenProvider jwtTokenUtil;
	
	@Override
	@Before
	public void setUp() {
		final Authentication authentication = authenticationManager.authenticate(
	               new UsernamePasswordAuthenticationToken(
	                       "admin",
	                        "admin"
	               )
	       );
	       SecurityContextHolder.getContext().setAuthentication(authentication);
	       jwtTokenUtil.generateToken(authentication);
		super.setUp();
	}
	
   @Test
   public void getUsersList() throws Exception {
	  String uri = "/users";
      MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
         .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();
      
      int status = mvcResult.getResponse().getStatus();
      assertEquals(200, status);
      String content = mvcResult.getResponse().getContentAsString();
      User[] userlist = super.mapFromJson(content, User[].class);
      assertTrue(userlist.length > 0);
   }
   
   @Test
   public void createUser() throws Exception {
      String uri = "/signup";
      User user = new User();
      user.setPassword("test");
      user.setUsername("unitTestUser");
      String inputJson = super.mapToJson(user);
      MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri).contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson)).andReturn();
      int status = mvcResult.getResponse().getStatus();
      assertEquals(200, status);
      String content = mvcResult.getResponse().getContentAsString();
      User newuser = super.mapFromJson(content, User.class);
      System.out.println(newuser.getId());
   }

}
