package com.sword.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.sword.dao.RoleDao;
import com.sword.dao.UserDao;
import com.sword.model.Role;
import com.sword.model.User;
import com.sword.service.RoleService;
import com.sword.service.UserService;

@Service(value = "roleService")
public class RoleServiceImpl implements RoleService {

	@Autowired
	private RoleDao roleDao;

	public List<Role> findAll() {
		List<Role> list = new ArrayList<>();
		roleDao.findAll().iterator().forEachRemaining(list::add);
		return list;
	}

}