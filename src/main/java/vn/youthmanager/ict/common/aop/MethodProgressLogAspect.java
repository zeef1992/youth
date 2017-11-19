package vn.youthmanager.ict.common.aop;

import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import vn.youthmanager.ict.common.util.Util;

@Aspect
@Component
public class MethodProgressLogAspect {

    private static Logger logger = Logger.getLogger(MethodProgressLogAspect.class);

    @Before("execution(* vn.bananavietnam.ict.banana.service.*.*(..))")
    public void before(JoinPoint jp) {
        StringBuilder sb = new StringBuilder("");
        sb.append("INFO," + Util.getUserInfo().getID() + ",");
        sb.append(jp.getTarget().getClass().getName() + ",");
        sb.append(jp.getSignature().getName() + " METHOD START");
        logger.info(new String(sb));
    }

    @Before("execution(* vn.bananavietnam.ict.banana.service.*.*.newRequest(..))")
    public void newRequest(JoinPoint jp) {

    }

    @After("execution(* vn.bananavietnam.ict.banana.service.*.*(..))")
    public void after(JoinPoint jp) {
    	StringBuilder sb = new StringBuilder("");
        sb.append("INFO," + Util.getUserInfo().getID() + ",");
        sb.append(jp.getTarget().getClass().getName() + ",");
        sb.append(jp.getSignature().getName() + " METHOD END");
        logger.info(new String(sb));
    }
}