package vn.youthmanager.ict.common.aop;

import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.AnnotationBeanNameGenerator;

/**
 * �Ǝ���`�� {@link BeanNameGenerator}
 * �����Ƃ��� {@link AnnotationBeanNameGenerator} �Ɠ���
 */
public class BeanNameGenerator extends AnnotationBeanNameGenerator {

    @Override
    protected String buildDefaultBeanName(BeanDefinition definition) {
        String defaultBeanName = super.buildDefaultBeanName(definition);
        return defaultBeanName;
    }
}